'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import NewsletterWidget from "@/app/components/widgets/newsletter";

export default function NewsletterAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="/api/components/newsletter"
      widgetComponent={NewsletterWidget}
      title="Newsletter"
    />
  );
} 