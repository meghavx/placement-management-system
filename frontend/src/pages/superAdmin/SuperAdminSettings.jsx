/*
==========================================
Component: SuperAdminSettings

Purpose:
Allows the Super Admin to configure system settings (SRS 2.3
"Configure system settings", "Manage permissions").

Current Features:
- Institution profile form
- Role permission toggles (frontend-only demonstration)

Future Backend Integration:
GET /super-admin/settings, PUT /super-admin/settings.
==========================================
*/

import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import { useNotification } from '../../hooks/useNotification'

export default function SuperAdminSettings() {
  const { notify } = useNotification()
  const [institutionName, setInstitutionName] = useState('National College of Engineering')
  const [supportEmail, setSupportEmail] = useState('placement.cell@college.edu')
  const [permissions, setPermissions] = useState({
    allowRecruiterSelfRegistration: false,
    allowStudentResumeReplace: true,
    requireEligibilityCheckBeforeApply: true,
  })
  const [saving, setSaving] = useState(false)

  const togglePermission = (key) => setPermissions((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleSave = async () => {
    setSaving(true)
    // Backend Integration: replace with real PUT /super-admin/settings call.
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSaving(false)
    notify('Settings Updated')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="System Settings"
        description="Configure institution-wide settings and permissions."
        breadcrumb={['Dashboard', 'Settings']}
      />

      <Card title="Institution Profile">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Institution Name" name="institutionName" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
          <Input label="Support Email" name="supportEmail" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
        </div>
      </Card>

      <Card title="Permissions">
        <div className="flex flex-col gap-3">
          <Checkbox
            name="allowRecruiterSelfRegistration"
            label="Allow recruiters to self-register (subject to admin approval)"
            checked={permissions.allowRecruiterSelfRegistration}
            onChange={() => togglePermission('allowRecruiterSelfRegistration')}
          />
          <Checkbox
            name="allowStudentResumeReplace"
            label="Allow students to replace their resume at any time"
            checked={permissions.allowStudentResumeReplace}
            onChange={() => togglePermission('allowStudentResumeReplace')}
          />
          <Checkbox
            name="requireEligibilityCheckBeforeApply"
            label="Require eligibility verification before every application"
            checked={permissions.requireEligibilityCheckBeforeApply}
            onChange={() => togglePermission('requireEligibilityCheckBeforeApply')}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} loading={saving}>Save Settings</Button>
      </div>
    </div>
  )
}
