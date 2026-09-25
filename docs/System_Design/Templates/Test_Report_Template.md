# Test Report Template — ControlPanelOntology

**Document type:** Test Report  
**Template version:** 1.1  

One report per **test case / flow step**. Always name the **scenario under test**.  
Filing a TR is what allows SRVM to move a row off **Open**.

---

## Document control

| Field | Value |
|-------|--------|
| **Test report ID** | TR-OPS-xxx-01 / TR-E-xx-01 |
| **Title** | |
| **Scenario under test** | e.g. **OPS-013** — Act on ontology object targeting any SoA |
| **Scenario file** | `Subsystem/SAC-xxx/Scenarios/OPS-….md` or `Subsystem/Scenarios/E-….md` |
| **Parent test plan** | TP-… |
| **Test case ID** | TC-… |
| **Flow step** | Step N of M |
| **Subsystem(s)** | SAC-… |
| **Edges exercised** | SoA peer id(s) / data / logic / none |
| **Executor** | |
| **Date executed** | |
| **Environment** | Compose / host / simulate / live |
| **Status** | Not run / Pass / Fail / Blocked / Waived |

---

## 1. Objective

What this step proves for the named scenario.



---

## 2. Method

Test / Demonstration / Inspection / Analysis

---

## 3. Procedure

1. 
2. 
3. 

---

## 4. Expected results

- 

**Pass criteria:**

- Scenario Success condition met  
- No vendor field leak in public responses  
- Failures honest (no fake “live” success)

**Fail criteria:**

- 

---

## 5. Actual results

*(Fill when executed.)*



**Evidence:**

| Item | Link / location |
|------|-----------------|
| Logs / correlation id | |
| Screenshots / artifacts | |
| connector_id / adapter mode | live \| simulate |

---

## 6. Disposition

| Field | Value |
|-------|--------|
| **Disposition** | Pass / Fail / Blocked / Waived |
| **SRVM update** | Left **Open** / Closed with this TR *(only if Pass and SHALL covered)* |
| **Defects** | |
| **Notes** | |

---

## 7. Revision history

| Date | Version | Change | Author |
|------|---------|--------|--------|
| | 0.1 | Initial report shell | |

---

*End of test report template*
