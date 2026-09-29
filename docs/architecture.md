# Architecture & Design — Incident Management High Impact Control

## Component Diagram

```
ServiceNow Incident Form
        │
        ├── Client Scripts (runs in browser)
        │       └── High Impact Control (onChange: impact)
        │               ├── Sets mandatory: assignment_group, assigned_to, business_service
        │               └── Displays info messages
        │
        └── UI Policies (evaluated server + client)
                ├── High Impact Mandatory Fields
                │       ├── Condition: impact = 1 - High
                │       ├── Actions: mandatory + visible on 3 fields
                │       └── Scripts: priority field messaging
                └── Hide Resolution Fields Until Resolved
                        ├── Condition: state != Resolved AND != Closed
                        └── Actions: hide/show Resolution Information section
```

## Design Decisions

### Why both Client Script AND UI Policy?
- **UI Policy** handles the `on_load` case (re-opening an existing High Impact incident) and sets field-level properties declaratively.
- **Client Script** handles the dynamic `onChange` case to give real-time feedback without a page reload.
- Together, they ensure consistent behavior regardless of how the form is accessed.

### Why `reverse_if_false: true` on the UI Policy?
Automatically reverses the mandatory/visible actions when the condition is no longer met — no need for a separate "else" UI policy.

## Execution Order
1. Form loads → UI Policy evaluates condition → applies field actions
2. User changes `impact` → Client Script `onChange` fires → dynamically adjusts mandatory flags and messages
3. User submits → ServiceNow server-side validation runs (backup enforcement)
