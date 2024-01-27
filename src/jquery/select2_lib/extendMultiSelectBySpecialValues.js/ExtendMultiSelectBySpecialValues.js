/**
 * Extend Select2 for working with special values:
 * 1. Default value:
 *    1.1 Set this value every time if multiselect is empty;
 *    1.2 Remove other selected values after selecting the default value.
 * 2. Single values:
 *    2.1 Remove other selected values after selecting one of the single values.
 *
 * @param {string} selector (Required) - Selector for getting an element by jQuery.
 * @param {string|number|null|undefined} defaultValue - Special value with parameters p.1.
 * @param {string|number|array|null|undefined} singleValues - Special value or values with parameters p.2.
 *
 * @return {any} Class with the init() function.
 */

const EVENTS = Object.freeze({
    change: 'change',
    onSelecting: 'select2:selecting',
    onUnselecting: 'select2:unselecting',
});

const isNullOrUndefined = value => value === null || value === undefined;

export default class ExtendMultiSelectBySpecialValues {
    constructor({ selector, defaultValue = null, singleValues = null }) {
        this._jqueryElement = $(selector);
        this._defaultValue = defaultValue;
        this._singleValues = isNullOrUndefined(singleValues)
            ? singleValues
            : (Array.isArray(singleValues) ? singleValues : [singleValues]);

        this._events = [
            {
                title: EVENTS.onSelecting,
                function: this._onSingleSelecting,
            }
        ];

        !isNullOrUndefined(defaultValue) && this._events.push({
            title: EVENTS.onUnselecting,
            function: this._setDefaultValueOnUnselecting,
        });
    }

    // If selecting a single value, then select this value and remove others.
    // Or if a single value is selected and another is selected, then remove it from the selected values.
    _onSingleSelecting = (event) => {
        const jquerySelect = $(event.target);
        const eventValue = event.params.args.data.id;

        const isDefaultValue = eventValue === this._defaultValue;
        const isSingleValue = this._singleValues && this._singleValues.includes(eventValue);

        if (isDefaultValue || isSingleValue) {
            jquerySelect.val([eventValue]).trigger('change.select2');
        } else {
            const selectedValues = jquerySelect.val() || [];
            const singleSelectedValues = [this._defaultValue].concat(this._singleValues || []);

            const filteredSelectedValues = selectedValues.filter(value => !singleSelectedValues.includes(value));

            jquerySelect.val(filteredSelectedValues).trigger('change.select2');
        }
    }

    // Set the default value if the select is empty before unselected.
    _setDefaultValueOnUnselecting = (event) => {
        const jquerySelect = $(event.target);
        const eventValue = event.params.args.data.id;
        const isEmpty = (jquerySelect.val() || [])
            .filter(value => value !== eventValue)
            .length === 0;

        if (isEmpty && !isNullOrUndefined(this._defaultValue)) {
            event.preventDefault();
            jquerySelect.val([this._defaultValue]).trigger('change');
        }
    }

    // Set the default value on class initialization.
    _setDefaultValueOnInit = (jquerySelect) => {
        const selectedValues = jquerySelect.val() || [];
        const newSelectedValue = selectedValues.length ? selectedValues : [this._defaultValue];
        jquerySelect.val(newSelectedValue).trigger('change.select2');
    }

    // Initialize all events for default and single values if they exist.
    init = () => {
        if (this._jqueryElement) {
            this._events.forEach((event) => {
                this._jqueryElement.on(event.title, event.function);
            });

            !isNullOrUndefined(this._defaultValue) && this._setDefaultValueOnInit(this._jqueryElement);
        }
    }
}