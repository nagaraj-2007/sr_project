# ServiceNow Incident Management — Client Scripts & UI Policies

A version-controlled repository for **ServiceNow customizations** related to the Incident Management module. This project contains Client Scripts, UI Policies, and supporting scripts that enforce business rules on the Incident form.

---

## 📋 Project Overview

This project automates field visibility, mandatory-field enforcement, and dynamic UI behavior for the ServiceNow Incident form. The primary use case is **High Impact Control** — when an incident is marked as High priority/impact, specific fields become mandatory and additional sections become visible.

---

## 🗂️ Repository Structure

```
sr_project/
├── scripts/
│   ├── client_scripts/         # Plain-text JS — Client Script logic
│   │   └── high_impact_control.client.js
│   └── ui_policies/            # Plain-text JS — UI Policy actions
│       └── high_impact_mandatory_fields.ui_policy.js
├── update_sets/                # Exported ServiceNow Update Set XMLs
│   └── incident_management_update_set.xml
├── docs/                       # Architecture & design documentation
│   ├── architecture.md
│   └── test_scenarios.md
├── tests/                      # Automated test cases / ATF exports
│   └── incident_management_atf.xml
├── .github/
│   └── workflows/
│       └── lint.yml            # CI: JavaScript lint on push/PR
├── .gitignore
├── .env.example                # Sanitized env template (no real values)
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## ⚙️ Fields Involved

| Field Label              | Field Name           | Behavior                                      |
|--------------------------|----------------------|-----------------------------------------------|
| Priority                 | `priority`           | Trigger: when set to **1 - Critical**         |
| Impact                   | `impact`             | Trigger: when set to **1 - High**             |
| Urgency                  | `urgency`            | Trigger: when set to **1 - High**             |
| Assignment Group         | `assignment_group`   | Mandatory on High Impact                      |
| Assigned To              | `assigned_to`        | Mandatory on High Impact                      |
| Business Service         | `business_service`   | Mandatory on High Impact                      |
| Description              | `description`        | Mandatory always; highlighted on High Impact  |
| Resolution Notes         | `close_notes`        | Mandatory when closing a High Impact incident |

---

## 🛠️ Customization Details

### Client Scripts
| Script Name                    | Type       | Table    | Condition                        |
|-------------------------------|------------|----------|----------------------------------|
| High Impact Control            | onChange   | Incident | Impact = 1 - High                |
| Mandatory Fields on Resolution | onSubmit   | Incident | State = Resolved/Closed          |

### UI Policies
| Policy Name                        | Condition               | Actions                                              |
|------------------------------------|-------------------------|------------------------------------------------------|
| High Impact Mandatory Fields       | Impact is 1 - High      | Assignment Group, Assigned To, Business Service → mandatory |
| Hide Resolution Fields Until Close | State is not Resolved   | Resolution Notes → hidden, read-only                 |

---

## 🚀 Setup & Installation

### Prerequisites
- ServiceNow instance (Tokyo, Utah, or later)
- Admin or `import_set_admin` role to import update sets

### Import the Update Set
1. Navigate to **System Update Sets → Retrieved Update Sets**
2. Click **Import Update Set from XML**
3. Upload the file from `update_sets/incident_management_update_set.xml`
4. Click **Preview Update Set** → resolve any conflicts
5. Click **Commit Update Set**

### Review Scripts Locally
All script logic is mirrored as plain JavaScript in `scripts/` for easy code review without needing a ServiceNow instance.

---

## 🧪 Test Scenarios

See [`docs/test_scenarios.md`](docs/test_scenarios.md) for detailed test cases. Quick summary:

| Scenario                         | Expected Result                                      |
|----------------------------------|------------------------------------------------------|
| Set Impact to 1 - High           | Assignment Group, Assigned To, Business Service → mandatory |
| Set Impact to 2 - Medium         | Above fields → optional again                        |
| Submit with High Impact, no group| Validation error: "Assignment Group is required"     |
| Resolve a High Impact incident   | Resolution Notes → mandatory                         |

---

## 📁 What's in This Repo / What's Not

### ✅ Included
- ServiceNow Update Set XML exports
- Plain-text JS files for code review
- Documentation and test scenarios
- CI/CD linting workflow

### ❌ Excluded (see `.gitignore`)
- Instance credentials or OAuth tokens
- Personal `.env` files (use `.env.example` as a template)
- ServiceNow `node_modules` or local build artifacts
- Log files and OS/editor metadata

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on branching strategy, commit conventions, and how to export update sets before submitting a PR.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
