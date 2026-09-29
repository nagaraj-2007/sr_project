/**
 * UI Policy: High Impact Mandatory Fields
 * Table:     Incident [incident]
 * Condition: Impact is 1 - High
 * Active:    true
 * On Load:   true
 *
 * UI Policy Actions (configured in ServiceNow UI Policy editor):
 * ┌─────────────────────────┬───────────┬───────────┬────────────┐
 * │ Field                   │ Mandatory │ Visible   │ Read Only  │
 * ├─────────────────────────┼───────────┼───────────┼────────────┤
 * │ assignment_group        │ true      │ true      │ false      │
 * │ assigned_to             │ true      │ true      │ false      │
 * │ business_service        │ true      │ true      │ false      │
 * └─────────────────────────┴───────────┴───────────┴────────────┘
 *
 * Script (Execute if true) — runs when condition is met:
 */

// Script: Execute if TRUE (condition met — Impact IS High)
function onCondition() {
  // These are applied via UI Policy actions configured in the platform.
  // This script block handles any additional dynamic logic when High Impact is true.

  // Highlight the priority field for visual urgency
  g_form.showFieldMsg(
    "priority",
    "This is a High Impact incident. Ensure escalation procedures are followed.",
    "info"
  );

  // Auto-populate Watch List with the default escalation group (optional)
  // Uncomment and replace GID with your group's sys_id if needed:
  // g_form.setValue('watch_list', 'sys_id_of_escalation_group');
}

// Script: Execute if FALSE (condition not met — Impact is NOT High)
function onConditionElse() {
  // Clear any messages set by the true condition
  g_form.hideFieldMsg("priority", true);
}
