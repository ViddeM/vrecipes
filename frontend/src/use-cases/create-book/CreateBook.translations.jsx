
export const GRID_TRANSLATIONS = {
    // Root
    rootGridLabel: 'grid',
    noRowsLabel: 'Inga rader',
    errorOverlayDefaultLabel: 'Ett oväntat fel inträffade',

    // Density selector toolbar button text
    toolbarDensity: 'Storlek',
    toolbarDensityLabel: 'Storlek',
    toolbarDensityCompact: 'Liten',
    toolbarDensityStandard: 'Vanlig',
    toolbarDensityComfortable: 'Stor',

    // Columns selector toolbar button text
    toolbarColumns: 'Kolumner',
    toolbarColumnsLabel: 'Välj kolumner',

    // Filters toolbar button text
    toolbarFilters: 'Filter',
    toolbarFiltersLabel: 'Visa filter',
    toolbarFiltersTooltipHide: 'Göm filter',
    toolbarFiltersTooltipShow: 'Visa filter',
    toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktiva filter` : `${count} aktivt filter`,

    // Export selector toolbar button text
    toolbarExport: 'Exportera',
    toolbarExportLabel: 'Exportera',
    toolbarExportCSV: 'Ladda ned som CSV',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Hitta kolumn',
    columnsPanelTextFieldPlaceholder: 'Kolumn titel',
    columnsPanelDragIconLabel: 'Omordna kolumn',
    columnsPanelShowAllButton: 'Visa alla',
    columnsPanelHideAllButton: 'Göm alla',

    // Filter panel text
    filterPanelAddFilter: 'Lägg till filter',
    filterPanelDeleteIconLabel: 'Ta bort',
    filterPanelOperators: 'Operatorer',
    filterPanelOperatorAnd: 'Och',
    filterPanelOperatorOr: 'Eller',
    filterPanelColumns: 'Kolumner',
    filterPanelInputLabel: 'Värde',
    filterPanelInputPlaceholder: 'Filtreringsvärde',

    // Filter operators text
    filterOperatorContains: 'innehåller',
    filterOperatorEquals: 'exakt',
    filterOperatorStartsWith: 'börjar med',
    filterOperatorEndsWith: 'slutar med',

    // Filter values text
    filterValueAny: 'valfri',
    filterValueTrue: 'sant',
    filterValueFalse: 'falskt',

    // Column menu text
    columnMenuLabel: 'Meny',
    columnMenuShowColumns: 'Visa kolumner',
    columnMenuFilter: 'Filter',
    columnMenuHideColumn: 'Göm',
    columnMenuUnsort: 'Osortera',
    columnMenuSortAsc: 'Sortera ökandes',
    columnMenuSortDesc: 'Sortera minskandes',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktiva filter` : `${count} aktivt filter`,
    columnHeaderFiltersLabel: 'Visa filter',
    columnHeaderSortIconLabel: 'Sortera',

    // Rows selected footer text
    footerRowSelected: (count) =>
    count !== 1
    ? `${count.toLocaleString()} rader valda`
    : `${count.toLocaleString()} rad vald`,

    // Total rows footer text
    footerTotalRows: 'Totala rader:',

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Ikryssning',

    // Boolean cell text
    booleanCellTrueLabel: 'sant',
    booleanCellFalseLabel: 'falskt',
};