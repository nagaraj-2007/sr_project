/**
 * UI Policy: Hide Resolution Fields Until Resolved/Closed
 * Table:     Incident [incident]
 * Condition: State is NOT Resolved AND State is NOT Closed
 * Active:    true
 * On Load:   true
 *
 * UI Policy Actions:
 * ┌──────────────────┬───────────┬───────────┬────────────┐
 * │ Field            │ Mandatory │ Visible   │ Read Only  │
 * ├──────────────────┼───────────┼───────────┼────────────┤
 * │ close_notes      │ false     │ false     │ true       │
 * │ close_code       │ false     │ false     │ true       │
 * └──────────────────┴───────────┴───────────┴────────────┘
 *
 * Script: Execute if TRUE (condition met — state is open/in-progress)
 */

function onCondition() {
  // Hide resolution section when incident is not yet resolved
  g_form.setSectionDisplay("Resolution Information", false);
}

function onConditionElse() {
  // Show resolution fields and make close_notes mandatory
  g_form.setSectionDisplay("Resolution Information", true);
  g_form.setMandatory("close_notes", true);
  g_form.setMandatory("close_code", true);
}
