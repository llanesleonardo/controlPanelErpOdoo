# Test Plan Template — ControlPanelOntology

**Document type:** Test Plan  
**Template version:** 1.1  
**Related:** ConOps · SRD · TSD · SRVM · [SCENARIOS](../Subsystem/SCENARIOS.md)

One plan per scenario is preferred (`TP-OPS-xxx` / `TP-E-xx`).  
**A green smoke does not close the scenario** — create a TR under `Reports/` and update SRVM.

---

## 1. Document control

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-xxx / TP-E-xx |
| **Title** | |
| **Product / version under test** | ControlPanelOntology / |
| **Subsystem(s)** | SAC-… |
| **Related SRD IDs** | SRD-… |
| **Related ConOps scenario** | OPS-… / E-… (**Open**) |
| **Scenario file** | link under `SAC-*/Scenarios/` or `Subsystem/Scenarios/` |
| **Author** | |
| **Date** | |
| **Status** | **Open** / Ready / In use *(Complete only after TR + SRVM)* |

---

## 2. Purpose

**In one sentence:** What this plan proves for the named scenario.

**Scope (in):**

- 

**Scope (out):**

- Closing other scenarios; inventing free-form edge calls

---

## 3. What tests to run

| Test case ID | Title | Priority | Related SRD / OPS | Notes |
|--------------|-------|----------|-------------------|-------|
| TC-001 | | High / Med / Low | | |
| TC-002 | | | | Failure / degraded path |

---

## 4. Verification method

| Method | When to use |
|--------|-------------|
| **Test** | Run system/component with inputs → outputs |
| **Demonstration** | Show capability (often UI / e2e) |
| **Inspection** | Review docs, configs, code, logs |
| **Analysis** | Calculate / reason without live run |

| Test case ID | Method | Why |
|--------------|--------|-----|
| TC-001 | | |

---

## 5. Setup and data

### 5.1 Environment

| Item | Value |
|------|--------|
| **Environment** | Local Compose / host apps / … |
| **Build** | commit / image tag |
| **Control plane** | Postgres + gateway + orch + web (as needed) |
| **Edges** | External URLs — **not** in Compose; use `simulate` when safe |
| **Config notes** | `ODOO_MODE` / peer env; allowlist; actor header |

### 5.2 Accounts and roles

| Role | Identity | Needed for |
|------|----------|------------|
| Operator | e.g. `X-Actor-Id` | |
| Admin | | connector config |
| SDK client | | OPS-019 style |

### 5.3 Test data

| Data set ID | Description | How to load |
|-------------|-------------|-------------|
| TD-001 | | |

**Preconditions:**

1. Scenario preconditions met  
2. No browser-direct vendor credentials in the test client  

---

## 6. Steps (per test case)

### TC-xxx — [Title]

| Field | Content |
|-------|---------|
| **Objective** | |
| **Method** | Test / Demo / Inspection / Analysis |
| **Related SRD** | |
| **Related scenario** | OPS-… / E-… |
| **Setup / data** | TD-… |
| **Who / when** | |

**Steps:**

1. 
2. 
3. 

**Expected results:**

- Honest failure messaging when edges are down  
- Business vocabulary in UI/API (no raw vendor leaks)  

**Pass / fail criteria:**



**Actual result / evidence / disposition:** *(during execution)*

---

## 7. Who runs it and when

| Trigger | What runs | Owner |
|---------|-----------|-------|
| Local smoke | | |
| Before release | Required TPs for claimed SHALLs | E-05 / E-06 |
| On-demand | | |

---

## 8. Evidence and SRVM hand-off

| Item | Location |
|------|----------|
| Test report | `TestPlans/<ID>/Reports/TR-<ID>-nn.md` |
| SRVM rows | stay **Open** until TR attached |
| Open defects | |

**Remember:** Plan = *how* to check. **SRVM** = whether the **requirement** is closed.

---

## 9. Revision history

| Date | Version | Change | Author |
|------|---------|--------|--------|
| | 0.1 | Initial from template | |

## Quick checklist before Ready

- [ ] Named scenario + file link  
- [ ] At least one failure / degraded path  
- [ ] Edges treated as peers (simulate/live explicit)  
- [ ] Status remains Open until TR exists  
- [ ] No ScaleCC-only assumptions (prospects, crawl, catch-all)  

---

*End of test plan template*
