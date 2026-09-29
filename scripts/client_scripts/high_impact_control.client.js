/**
 * Client Script: High Impact Control
 * Table:         Incident [incident]
 * Type:          onChange
 * Field Name:    impact
 * Active:        true
 *
 * Purpose:
 *   When the Impact field changes to "1 - High", this script:
 *     1. Makes Assignment Group, Assigned To, and Business Service mandatory.
 *     2. Displays an informational message to the agent.
 *   When Impact is set to anything other than High, fields are reset to optional.
 *
 * Dependencies: None (pure GlideForm API)
 */

function onChange(control, oldValue, newValue, isLoading) {
  // Do not run on form load or if value hasn't changed
  if (isLoading || newValue === oldValue) {
    return;
  }

  var HIGH_IMPACT = "1"; // ServiceNow stores Impact 1 - High as "1"

  if (newValue === HIGH_IMPACT) {
    enforceHighImpactRules();
  } else {
    releaseHighImpactRules();
  }
}

/**
 * Enforces mandatory fields and shows a warning when impact is High.
 */
function enforceHighImpactRules() {
  // Make critical fields mandatory
  g_form.setMandatory("assignment_group", true);
  g_form.setMandatory("assigned_to", true);
  g_form.setMandatory("business_service", true);

  // Make fields visible (in case a UI Policy hid them)
  g_form.setVisible("assignment_group", true);
  g_form.setVisible("assigned_to", true);
  g_form.setVisible("business_service", true);

  // Show informational flash message
  g_form.addInfoMessage(
    "⚠️ High Impact incident detected. Assignment Group, Assigned To, and Business Service are now required."
  );
}

/**
 * Releases mandatory constraints when impact is no longer High.
 */
function releaseHighImpactRules() {
  g_form.setMandatory("assignment_group", false);
  g_form.setMandatory("assigned_to", false);
  g_form.setMandatory("business_service", false);

  // Remove any lingering info messages
  g_form.clearMessages();
}
