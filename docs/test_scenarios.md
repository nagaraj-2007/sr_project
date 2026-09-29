# Test Scenarios — Incident Management High Impact Control

## Overview
These test scenarios validate the Client Scripts and UI Policies implemented for High Impact incident handling on the ServiceNow Incident form.

---

## 🧪 Test Suite: Client Script — High Impact Control

### TC-001: Set Impact to High
| | |
|---|---|
| **Precondition** | Open a new Incident form. Impact = 2 - Medium (default). |
| **Steps** | Change the **Impact** field to **1 - High**. |
| **Expected Result** | Assignment Group, Assigned To, and Business Service become **mandatory** (marked with red asterisk). An info message appears: *"High Impact incident detected..."* |
| **Pass/Fail** | |

### TC-002: Change Impact Away from High
| | |
|---|---|
| **Precondition** | Impact is set to 1 - High (TC-001 complete). |
| **Steps** | Change the **Impact** field to **2 - Medium**. |
| **Expected Result** | Assignment Group, Assigned To, and Business Service return to **optional**. Info message disappears. |
| **Pass/Fail** | |

### TC-003: Submit Incident Without Required Fields (High Impact)
| | |
|---|---|
| **Precondition** | Impact = 1 - High. Assignment Group is empty. |
| **Steps** | Click **Submit**. |
| **Expected Result** | Form validation error: *"Assignment Group is required."* Incident is NOT submitted. |
| **Pass/Fail** | |

### TC-004: Submit Incident With All Required Fields (High Impact)
| | |
|---|---|
| **Precondition** | Impact = 1 - High. All mandatory fields are populated. |
| **Steps** | Click **Submit**. |
| **Expected Result** | Incident is created successfully. No validation errors. |
| **Pass/Fail** | |

---

## 🧪 Test Suite: UI Policy — Hide Resolution Fields

### TC-005: Resolution Section Hidden on New/Open Incident
| | |
|---|---|
| **Precondition** | Open a new Incident form. State = New. |
| **Steps** | Observe the form layout. |
| **Expected Result** | "Resolution Information" section is **hidden**. Resolution Notes and Close Code are not visible. |
| **Pass/Fail** | |

### TC-006: Resolution Section Visible When Resolved
| | |
|---|---|
| **Precondition** | Open an existing Incident. State = In Progress. |
| **Steps** | Change **State** to **Resolved**. |
| **Expected Result** | "Resolution Information" section becomes **visible**. Resolution Notes and Close Code become **mandatory**. |
| **Pass/Fail** | |

### TC-007: Submit Resolution Without Close Notes
| | |
|---|---|
| **Precondition** | State = Resolved. Resolution Notes is empty. |
| **Steps** | Click **Update**. |
| **Expected Result** | Validation error: *"Resolution Notes is required."* Incident is NOT updated. |
| **Pass/Fail** | |

---

## 🧪 Test Suite: UI Policy — High Impact Mandatory Fields (On Load)

### TC-008: Form Load with Existing High Impact Incident
| | |
|---|---|
| **Precondition** | Open an existing Incident where Impact = 1 - High. |
| **Steps** | Observe the form on load. |
| **Expected Result** | Assignment Group, Assigned To, and Business Service are **immediately mandatory** on load. Info message on Priority field is visible. |
| **Pass/Fail** | |

---

## 📝 Test Execution Notes

- Run tests in a **non-production** ServiceNow instance (dev or test).
- Use a test user with the `itil` role.
- Record results in the table above with ✅ Pass or ❌ Fail.
- For failures, attach a screenshot and open a GitHub Issue.
