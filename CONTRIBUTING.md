# Contributing Guidelines

## Branching Strategy
- `main` — stable, production-ready code only
- `develop` — integration branch for features
- `feature/<ticket-id>-description` — individual feature branches (e.g., `feature/INC-1234-high-impact-control`)

## Before You Start
1. Create a ServiceNow update set in your dev instance named: `<your-initials>-<feature>-<date>`
2. Make and test all changes inside that update set
3. Export the update set XML before raising a PR

## Commit Message Format
```
<type>(<scope>): <short summary>

Types: feat | fix | docs | refactor | test | chore
Example: feat(client-script): add mandatory fields for high impact
```

## Pull Request Checklist
- [ ] Update set XML exported and placed in `update_sets/`
- [ ] Plain-text JS files updated in `scripts/`
- [ ] Test scenarios documented or updated in `docs/test_scenarios.md`
- [ ] README updated if new fields or behaviors added
- [ ] No secrets, credentials, or instance-specific URLs committed
