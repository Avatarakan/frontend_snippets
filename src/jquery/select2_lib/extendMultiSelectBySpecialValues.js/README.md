# ExtendMultiSelect2BySpecialValues
This class extends the functionality of Select2 for handling special values. It provides options for default values and single values, ensuring specific behavior during selection and unselection.

## Usage
```js
// Import the class
import ExtendMultiSelectBySpecialValues from './ExtendMultiSelectBySpecialValues';

// Initialize with a selector, default value, and single values
const select2Extension = new ExtendMultiSelect2BySpecialValues({
  selector: '#yourSelectElement',
  defaultValue: 'default',
  singleValues: ['singleValue1', 'singleValue2'],
});

// Initialize the events
select2Extension.init();
```

## Parameters
- selector (Required): A jQuery selector to get the element.
- defaultValue: A special value for default behavior (optional).
- singleValues: A special value or array of values for handling single selections (optional).

## Example
### html file
```html
<select
    id="some_id"
    class="select2"
    multiple
>
    <option value="0">-- All --</option>
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
</select>
```

### js code file
```js
new ExtendMultiSelectBySpecialValues({
    selector: '#filter-ramps',
    defaultValue: '0',
    singleValues: '2'
}).init();
```

## Functionality
- Default Value: Set the default value every time if the multiselect is empty. Remove other selected values after selecting the default value.
- Single Values: Remove other selected values after selecting one of the single values.

## Note
Ensure that [jQuery](https://jquery.com/) and [Select2](https://select2.org/) are included before using this script.
Customize the selector, defaultValue, and singleValues parameters according to your requirements.
