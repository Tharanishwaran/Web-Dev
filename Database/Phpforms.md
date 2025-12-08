# Implement Student Module with Parent Sub-Table

This guide explains how to create a **Student** module that includes a **Parent/Guardian** sub-table (allowing multiple parents/contacts per student), similar to how the "Contact Persons" feature works in the `dummy` module.

## 1. Database Setup (SQL)
Run these commands in your MySQL database to create both the main student table and the parent sub-table.

```sql
-- 1. Main Student Table
CREATE TABLE `student_main_table` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `last_updated_on` date DEFAULT NULL,
  `last_updated_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Parent/Guardian Sub-Table
CREATE TABLE `student_parent_table` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `main_id_fk` int(11) DEFAULT NULL,     -- Links to student_main_table.tid
  `parent_name` varchar(255) DEFAULT NULL,
  `parent_mobile` varchar(50) DEFAULT NULL,
  `relation` varchar(100) DEFAULT NULL,  -- e.g., Father, Mother
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 2. File: `student-ctrl.php`

**Step A: Setup Classes & Tables**
Around line 6-12:
```php
$obj_class_main = new czDBAccess();
$obj_class_parents = new czDBAccess(); // Create new object for parents

$obj_class_main->varTableName = 'student_main_table';
$obj_class_parents->varTableName = 'student_parent_table'; // Link to sub-table
```

**Step B: The INSERT Logic**
Inside `if (czGet('key1') == "insert")`:

1.  **Main Insert** (Save Student):
    ```php
    // Get form data
    $name = czPostForSQL('name');
    $age = czPostForSQL('age');
    $dob = czPostForSQL('dob');
    $city = czPostForSQL('city');
    // ... get other fields ...
    $created_on = date("Y-m-d");

    // Insert Student
    $insertFeilds = "name,age,dob,city,created_on";
    $insertValues = "'$name','$age','$dob','$city','$created_on'";
    $insertId = $obj_class_main->insertDataWithReturnValue($insertFeilds, $insertValues);
    ```

2.  **Sub-Table Insert** (Save Parents):
    *Keep this loop structure, but update fields:*
    ```php
    if ($insertId > 0 && isset($_POST['row_contact'])) {
        $rows = $_POST['row_contact'];
        foreach ($rows as $row) {
            if (isset($row['parent_name']) && $row['parent_name'] != '') {
                
                $p_name = $row['parent_name'];
                $p_mobile = $row['parent_mobile'];
                $p_relation = $row['relation'];

                $insertFeilds_con = "main_id_fk,parent_name,parent_mobile,relation";
                $insertValues_con = "'$insertId','$p_name','$p_mobile','$p_relation'";
                
                // Use the parent object we created earlier
                $obj_class_parents->insertDataWithReturnValue($insertFeilds_con, $insertValues_con);
            }
        }
    }
    ```

**Step C: The UPDATE Logic**
Inside `if (czGet('key1') == "update")`:

1.  **Main Update**:
    ```php
    $updateValueAndFeilds = "name='$name',age='$age', ... ";
    $updateWhereClasuse = "tid = '$updateKey'";
    $obj_class_main->updateData($updateValueAndFeilds, $updateWhereClasuse);
    ```

2.  **Sub-Table Update Loop**:
    ```php
    if (isset($_POST['row_contact'])) {
        $rows = $_POST['row_contact'];
        foreach ($rows as $row) {
            $tid = $row['tid']; // The ID of the parent row
            $p_name = $row['parent_name'];
            $p_mobile = $row['parent_mobile'];
            $p_relation = $row['relation'];

            if ($tid > 0) {
                // Update existing parent
                $updateVal = "parent_name='$p_name',parent_mobile='$p_mobile',relation='$p_relation'";
                $updateWhere = "tid = '$tid'";
                $obj_class_parents->updateData($updateVal, $updateWhere);
            } else {
                // Insert NEW parent added during update
                $insertFeilds = "main_id_fk,parent_name,parent_mobile,relation";
                $insertValues = "'$updateKey','$p_name','$p_mobile','$p_relation'";
                $obj_class_parents->insertDataWithReturnValue($insertFeilds, $insertValues);
            }
        }
    }
    ```

---

## 3. File: `student-add.php`

**Step A: Configure Form**
Set action to `student-ctrl.php`.

**Step B: The Sub-Table HTML**
Locate the "Contact Persons" section. Rename titles to "**Parents / Guardians**".
Update the table headers:
```html
<thead>
  <tr>
    <th class="d-none">Tid</th>
    <th>Parent Name</th>
    <th>Relation</th>
    <th>Contact Number</th>
    <th>Action</th>
  </tr>
</thead>
```

**Step C: The PHP Loop (for Editing)**
When loading an existing student, we need to show existing parents.
```php
<tbody id="tempContactTable">
<?php
if (czGet('key1') == "update") {
  // Use the parent object
  $result = $obj_class_parents->selectData("*", "main_id_fk='" . czGet('updateKey') . "'");
  $looperI = 0;
  while ($row = $result->fetch_assoc()) {
    ?>
    <tr>
      <td class='d-none'>
        <input type='text' name='row_contact[<?php echo $looperI; ?>][tid]' value='<?php echo $row["tid"]; ?>'>
      </td>
      <td>
        <input type='text' class='form-control' name='row_contact[<?php echo $looperI; ?>][parent_name]' value='<?php echo $row["parent_name"]; ?>'>
      </td>
      <td>
        <input type='text' class='form-control' name='row_contact[<?php echo $looperI; ?>][relation]' value='<?php echo $row["relation"]; ?>'>
      </td>
      <td>
        <input type='text' class='form-control' name='row_contact[<?php echo $looperI; ?>][parent_mobile]' value='<?php echo $row["parent_mobile"]; ?>'>
      </td>
      <td>
         <!-- Delete Button Logic -->
         <a class='btn btn-light' id='btn-contact-remove'><span class='material-icons text-danger'>delete</span></a>
      </td>
    </tr>
    <?php
    $looperI++;
  }
}
?>
</tbody>
```

**Step D: The Javascript "Add Row"**
Scroll to the bottom `<script>`. Find `$("#btn-add-contact").click(...)`.
Update the `var row` string to generate inputs with the correct names: `parent_name`, `relation`, `parent_mobile`.

```javascript
$("#btn-add-contact").click(function() {
  var row =
    "<tr>" +
    "<td class='d-none'><input type='text' name='row_contact[" + rowIndexContact + "][tid]'></td>" +
    
    "<td><input type='text' class='form-control' name='row_contact[" + rowIndexContact + "][parent_name]'></td>" +
    
    "<td><input type='text' class='form-control' name='row_contact[" + rowIndexContact + "][relation]'></td>" +
    
    "<td><input type='text' class='form-control' name='row_contact[" + rowIndexContact + "][parent_mobile]'></td>" +
    
    "<td class='text-center'><a class='btn btn-light' id='btn-contact-remove'><span class='material-icons'>delete</span></a></td>" +
    "</tr>";

  $('#tempContactTable').append(row);
  rowIndexContact++;
});
```

**Step E: The Javascript "Remove Row"**
Update the API call to delete from the new table:
```javascript
var apiCall = getSingleValueFromDB("... api-call.php?type=DeleteData&tbl=student_parent_table&whereFeildName=tid...");
```

---

## 4. File: `student-my.php`
Update the columns to match `student_main_table` (Name, Age, Address, etc.). The sub-table data usually isn't shown in the main list view, or you can join it in the query if you want to show "Parent Name" in the main list.
