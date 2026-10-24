export type ExtendedPolicySlug =
  | "disclaimer"
  | "privacy-policy"
  | "terms-and-conditions"
  | "cookie-policy"
  | "refund-policy"
  | "code-of-conduct"
  | "governance-policy"
  | "financial-transparency-policy"
  | "anti-fraud-policy"
  | "grievance-policy"
  | "child-protection-policy"
  | "medical-treatment-policy"
  | "employment-policy"
  | "donation-policy"
  | "volunteer-policy"
  | "partnership-policy"
  | "sponsorship-policy"
  | "mentorship-policy"
  | "membership-policy"
;

export interface PolicySection {
  heading: string;
  body: string | string[];
}

export interface PolicyData {
  title: string;
  subtitle: string;
  category: "Legal & General" | "Governance & Ethics" | "Programs & Operations" | "Supporters & Engagement";
  effectiveDate?: string;
  sections: PolicySection[];
}

export const EXTENDED_POLICY_CONTENT: Record<ExtendedPolicySlug, PolicyData> = {
  "disclaimer": {
    title: "Disclaimer & Legal Notice",
    subtitle: "General informational disclaimer regarding program timelines, operational scope, and website content.",
    category: "Legal & General",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "General Legal Notice & Operational Scope",
        body: [
        "The information provided on this website is for general informational purposes only and reflects the vision, objectives, programs, and activities of ISLAH.",
        "Some programs and projects featured on this website are currently operational, while others are proposed initiatives aligned with the Foundation's charitable objectives. The implementation, scope, and timeline of proposed programs depend on the availability of funds, donations, CSR partnerships, grants, organisational capacity, and community needs.",
        "The inclusion of any program or project on this website does not guarantee its immediate implementation. ISLAH reserves the right to modify, postpone, expand, or discontinue any program without prior notice.",
        "We are committed to implementing our initiatives responsibly, transparently, and progressively as resources become available."
]
      },
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle: "Understanding how Islah collects, uses, stores, and safeguards visitor and donor personal data.",
    category: "Legal & General",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "1. Purpose",
        body: "We are committed to protecting your privacy and ensuring that your personal information is handled responsibly. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website or interact with our services."
      },
      {
        heading: "2. Information We Collect",
        body: [
        "We may collect the following information:",
        "• Name",
        "• Email address",
        "• Mobile number",
        "• Postal address",
        "• Donation details",
        "• Volunteer or membership information",
        "• Partnership or sponsorship enquiries",
        "• Any information you voluntarily provide through forms or email",
        "We may also collect limited technical information such as:",
        "• IP address",
        "• Browser type",
        "• Device information",
        "• Pages visited",
        "• Date and time of visit",
        "• Cookies and analytics data"
]
      },
      {
        heading: "3. How We Use Your Information",
        body: [
        "Your information may be used to:",
        "• Process donations and issue acknowledgements",
        "• Respond to enquiries and requests",
        "• Manage volunteer, membership, sponsorship, and partnership applications",
        "• Share updates about programs, events, and activities",
        "• Improve our website and user experience",
        "• Maintain records required by law",
        "• Communicate important organisational information"
]
      },
      {
        heading: "4. Donations",
        body: "If you donate through our website, payment transactions are processed through secure third-party payment gateways. Islah Welfare Foundation does not store your banking, debit card, credit card, or payment credentials."
      },
      {
        heading: "5. Cookies",
        body: [
        "Our website may use cookies and similar technologies to:",
        "• Improve website performance",
        "• Analyse visitor traffic",
        "• Remember user preferences",
        "• Enhance browsing experience You may disable cookies through your browser settings."
]
      },
      {
        heading: "6. Information Sharing",
        body: [
        "We respect your privacy. We do not sell, rent, or trade your personal",
        "information to third parties. Information may be shared only:",
        "• With authorised service providers assisting website operations",
        "• With payment gateway providers for donation processing",
        "• When required by applicable law, court order, or government authority",
        "• With your consent"
]
      },
      {
        heading: "7. Data Security",
        body: "We implement reasonable administrative, technical, and organisational measures to protect personal information from unauthorised access, alteration, disclosure, or misuse. However, no internet transmission or electronic storage system is completely secure."
      },
      {
        heading: "8. Third-Party Links",
        body: "Our website may contain links to third-party websites. Islah Welfare Foundation is not responsible for the privacy practices or content of external websites. Users should review their respective privacy policies."
      },
      {
        heading: "9. Children's Privacy",
        body: "Our website is not intended to collect personal information from children without appropriate parental or guardian consent."
      },
      {
        heading: "10. Your Rights",
        body: [
        "You may request:",
        "• Access your personal information",
        "• Correct inaccurate information",
        "• Update your details",
        "• Request deletion of information where legally permissible",
        "• Withdraw consent for future communications",
        "• Requests may be sent using the contact details below."
]
      },
      {
        heading: "11. Right to Amend",
        body: "This privacy policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this privacy policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on website with the revised effective date."
      },
      {
        heading: "12. Governing Law",
        body: "this privacy Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "13. Contact Us",
        body: "If you have any questions regarding this privacy Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
      },
      {
        heading: "14. Our Commitment",
        body: "Islah Welfare Foundation is committed to protecting your privacy and handling your personal information with transparency, responsibility, and integrity. We use your information solely to support our charitable mission and improve our services while complying with applicable laws and best practices."
      },
    ]
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle: "General conditions governing website usage, intellectual property, and organization guidelines.",
    category: "Legal & General",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. About the Website",
        body: "This website is maintained by Islah Welfare Foundation to provide information about our organization, programs, projects, events, publications, partnerships, volunteer opportunities, donations, and other charitable initiatives."
      },
      {
        heading: "3. Acceptance of Terms",
        body: [
        "By accessing this website, you agree to:",
        "• Use the website lawfully and responsibly.",
        "• Respect all applicable laws and regulations.",
        "• Not misuse or interfere with the website or its services."
]
      },
      {
        heading: "4. Website Content",
        body: "All information provided on this website is intended for general informational purposes only. The programs, projects, activities, plans, objectives, and initiatives described on this website reflect the charitable mission of Islah Welfare Foundation. Some activities are currently operational, while others are proposed or planned and may be implemented gradually based on the availability of funds, resources, partnerships, statutory approvals, community needs, and organizational capacity. Publication of any program or initiative on this website should not be interpreted as a guarantee that it has already commenced or will be implemented within a specific timeframe."
      },
      {
        heading: "5. Donations",
        body: "Donations made to Islah Welfare Foundation are voluntary and support our charitable objectives. Donated funds may be utilized for any of the Foundation's approved charitable programs, administrative requirements, or areas of greatest need, unless specifically designated by the donor and accepted by the Foundation. Donation receipts will be issued in accordance with applicable laws and organizational policies."
      },
      {
        heading: "6. Intellectual Property",
        body: [
        "Unless otherwise stated, all content on this website, including:",
        "• Text",
        "• Logos",
        "• Graphics",
        "• Images",
        "• Publications",
        "• Reports",
        "• Icons",
        "• Website design",
        "• Documents These mentioned above are the property of Islah Welfare Foundation or used with appropriate permission. No content may be copied, reproduced, modified, distributed, or commercially used without prior written permission from Islah Welfare Foundation."
]
      },
      {
        heading: "7. User Conduct",
        body: [
        "Users agree not to:",
        "• Upload harmful or unlawful content.",
        "• Attempt unauthorized access to the website or its systems.",
        "• Misrepresent themselves or submit false information.",
        "• Interfere with website functionality or security.",
        "• Use the website for fraudulent or illegal purposes."
]
      },
      {
        heading: "8. External Links",
        body: "This website may contain links to third-party websites for user convenience. IWF does not control or endorse the content, services, or privacy practices of external websites and is not responsible for any information available on those sites."
      },
      {
        heading: "9. Limitation of Liability",
        body: "While Islah Welfare Foundation strives to keep the website accurate and up to date, we make no warranties regarding the completeness, accuracy, reliability, or availability of the information. IWF shall not be liable for any direct, indirect, incidental, or consequential loss arising from the use of this website or reliance on its content."
      },
      {
        heading: "10. Privacy",
        body: "Your use of this website is also governed by our Privacy Policy, which explains how personal information is collected, used, and protected."
      },
      {
        heading: "11. Changes to the Website",
        body: [
        "This terms & conditions will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best",
        "organizational practices. Islah Welfare Foundation reserves the right to:",
        "• Update website content.",
        "• Modify programs and services.",
        "• Add or remove pages.",
        "• Amend these Terms & Conditions at any time without prior notice. To comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on website with the revised effective date. That updates terms will become effective upon publication on this website."
]
      },
      {
        heading: "12. Governing Law",
        body: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "13. Contact Us",
        body: "If you have any questions regarding these Terms & Conditions, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
      },
      {
        heading: "14. Our Commitment",
        body: "Islah Welfare Foundation is committed to transparency, accountability, and responsible governance. We appreciate your trust and support in helping us build healthier, educated, empowered, and self-reliant rural communities."
      },
    ]
  },
  "cookie-policy": {
    title: "Cookie Policy",
    subtitle: "Details how cookies and tracking technologies are utilized to enhance visitor experience.",
    category: "Legal & General",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. What Are Cookies? Cookies are small text files that are stored on your computer, mobile device,",
        body: "technologies when you visit our website. By continuing to use our website, you agree to the use of cookies in accordance with this Cookie Policy. or browser when you visit a website. They help websites function efficiently, remember user preferences, and improve the overall browsing experience."
      },
      {
        heading: "3. How We Use Cookies",
        body: [
        "Islah Welfare Foundation may use cookies to:",
        "• Ensure the proper functioning of the website.",
        "• Improve website performance and user experience.",
        "• Remember your preferences and settings.",
        "• Analyse website traffic and visitor behaviour.",
        "• Enhance website security.",
        "• Monitor the effectiveness of our content and services."
]
      },
      {
        heading: "4. Types of Cookies We Use",
        body: [
        "Essential Cookies: These cookies are necessary for the operation of our website and cannot be disabled. They enable basic functions such as page navigation and website security.",
        "Performance & Analytics Cookies:",
        "These cookies help us understand how visitors interact with our website by collecting anonymous",
        "information, allowing us to improve our content and services.",
        "Functional Cookies: These cookies remember your preferences, such as language or other settings,",
        "to provide a more personalized browsing experience",
        "Third-Party Cookies: Some pages may use third-party services such as payment gateways,",
        "embedded videos, maps, or social media integrations. These providers may place their own cookies,",
        "which are governed by their respective privacy and cookie policies."
]
      },
      {
        heading: "5. Managing Cookies",
        body: [
        "Most web browsers allow you to:",
        "• View stored cookies.",
        "• Delete existing cookies.",
        "• Block all or selected cookies.",
        "• Receive notifications before cookies are stored. Please note that disabling certain cookies may affect the functionality and performance of the website."
]
      },
      {
        heading: "6. Third-Party Services",
        body: [
        "Our website may use trusted third-party services for:",
        "• Website analytics",
        "• Payment processing",
        "• Embedded multimedia content",
        "• Social media integration",
        "• Security and spam protection These services may use cookies in accordance with their own privacy policies. IWF does not control third-party cookies."
]
      },
      {
        heading: "7. Changes to This Policy",
        body: "This Cookie Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with best organizational practices. Islah Welfare Foundation reserves the right to update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or website functionality. to comply with applicable laws, regulatory requirements, and organizational needs. The updated version will be published on website with the revised effective date."
      },
      {
        heading: "8. Governing Law",
        body: "This Cookie Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "9. Contact Us",
        body: "If you have any questions regarding this Cookie Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
      },
      {
        heading: "10. Our Commitment",
        body: "Islah Welfare Foundation respects your privacy and is committed to providing a secure, transparent, and user-friendly online experience. We use cookies responsibly to improve website functionality while protecting your personal information in accordance with our Privacy Policy."
      },
    ]
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    subtitle: "Terms governing voluntary contributions, refund eligibility, and transaction cancellations.",
    category: "Legal & General",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Donations",
        body: "All donations made to Islah Welfare Foundation are voluntary contributions intended to support our charitable objectives and programs. As donations are generally utilized or committed towards charitable activities soon after receiving receipt, donations are normally non-refundable."
      },
      {
        heading: "3. Refund Eligibility",
        body: [
        "Refund requests may be considered only under the following exceptional",
        "circumstances:",
        "• Duplicate donation or multiple payments made unintentionally.",
        "• Incorrect donations are due to a technical or payment processing error.",
        "• Unauthorized transaction, subject to verification and applicable banking/payment gateway procedures.",
        "• Any other exceptional circumstance considered appropriate by Islah Welfare Foundation after review. All refund requests are subject to verification and approval by the Foundation."
]
      },
      {
        heading: "4. Refund Request Process",
        body: [
        "To request a refund, the donor should contact Islah Welfare Foundation",
        "within 7 days of the transaction by providing:",
        "• Donor's name",
        "• Email address",
        "• Mobile number",
        "• Transaction ID",
        "• Donation amount",
        "• Date of transaction",
        "• Reason for requesting the refund",
        "• Supporting documents, if applicable Refund requests should be sent to: Email: info@iwfindia.org"
]
      },
      {
        heading: "5. Refund Processing",
        body: [
        "If a refund request is approved:",
        "• The refund will be processed through the original payment method wherever possible.",
        "• Processing time may vary depending on the payment gateway, bank, or financial institution.",
        "• Transaction or payment gateway charges, if any, may be deducted where permitted by applicable law. The decision of Islah Welfare Foundation regarding refund requests shall be final, subject to applicable laws."
]
      },
      {
        heading: "6. Cancellation of Recurring Donations",
        body: "If Islah Welfare Foundation offers recurring or monthly donation facilities, donors may cancel future recurring donations at any time by contacting the Foundation or using the available online cancellation facility. Cancellation will apply only to future scheduled donations and will not affect donations already processed."
      },
      {
        heading: "7. Event, Membership & Program Registration",
        body: [
        "Where applicable:",
        "• Registration for events, workshops, training programs, memberships, or volunteer activities may be cancelled before the scheduled date by contacting Islah Welfare Foundation.",
        "• Any applicable refund, if offered, will be governed by the specific terms communicated for that program or event. Unless expressly stated otherwise, registration fees, membership fees, and program fees are generally non-refundable."
]
      },
      {
        heading: "8. Medical Fundraising Campaigns",
        body: [
        "For donations made towards individual medical fundraising",
        "campaigns:",
        "• Donations are voluntary and generally non-refundable once processed.",
        "• Funds will be managed in accordance with the Critical Medical Fundraising Policy and the Donation Policy of Islah Welfare Foundation.",
        "• Donors acknowledge that surplus funds, if any, may be utilized for other eligible medical assistance initiatives in accordance with the applicable policy."
]
      },
      {
        heading: "9. Fraudulent or Misuse of Payment",
        body: [
        "Islah Welfare Foundation reserves the right to decline refund",
        "requests where:",
        "• Fraudulent activity is suspected.",
        "• Incorrect or misleading information has been provided.",
        "• The transaction violates applicable laws or organization policies."
]
      },
      {
        heading: "10. Changes to this Policy",
        body: "This Refund & Cancellation Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this refund & cancellation policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on website with the revised effective date."
      },
      {
        heading: "11. Governing Law",
        body: "This Refund & Cancellation Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "12. Contact Us",
        body: [
        "If you have any questions regarding this Refund & Cancellation Policy, please contact",
        "us:",
        "Islah Welfare Foundation",
        "Email: info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
]
      },
      {
        heading: "13. Our Commitment",
        body: "Islah Welfare Foundation is committed to maintaining transparency, accountability, and fairness in all financial transactions. We appreciate your trust and support in helping us create meaningful and sustainable change in rural communities."
      },
    ]
  },
  "code-of-conduct": {
    title: "Code of Conduct",
    subtitle: "Ethical standards, professional values, and behavioral guidelines for everyone associated with Islah.",
    category: "Governance & Ethics",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Scope",
        body: [
        "This Code of Conduct applies to:",
        "• Trustees and Governing Body Members",
        "• Employees",
        "• Volunteers",
        "• Mentors",
        "• Members",
        "• Consultants",
        "• Interns",
        "• Partners",
        "• Contractors",
        "• Sponsors",
        "• Any individual representing or acting on behalf of Islah Welfare Foundation"
]
      },
      {
        heading: "3. Our Core Values",
        body: [
        "Everyone associated with Islah Welfare Foundation is expected to uphold the",
        "following values:",
        "• Integrity and honesty",
        "• Respect for human dignity",
        "• Transparency and accountability",
        "• Professionalism",
        "• Equality and non-discrimination",
        "• Compassion and community service",
        "• Teamwork and collaboration",
        "• Environmental responsibility",
        "• Compliance with applicable laws"
]
      },
      {
        heading: "4. Professional Conduct",
        body: [
        "All representatives of Islah Welfare Foundation shall:",
        "• Act honestly, ethically, and responsibly.",
        "• Treat all individuals with dignity, courtesy, and respect.",
        "• Maintain professionalism in all interactions.",
        "• Protect the reputation and credibility of the Foundation.",
        "• Use organizational resources responsibly and only for authorized purposes.",
        "• Avoid behaviour that could bring the Foundation into disrepute."
]
      },
      {
        heading: "5. Respect and Inclusion",
        body: "Islah Welfare Foundation is committed to providing an inclusive environment where everyone is treated fairly. Discrimination, harassment, bullying, intimidation, hate speech, or abusive behaviour based on race, religion, gender, age, disability, nationality, or any other protected characteristic will not be tolerated."
      },
      {
        heading: "6. Safeguarding",
        body: [
        "Everyone associated with Islah Welfare Foundation must:",
        "• Respect the rights and dignity of children and vulnerable individuals.",
        "• Comply with the Foundation's Child Protection & Safeguarding Policy.",
        "• Immediately report any safeguarding concerns or suspected abuse. Islah Welfare Foundation has zero tolerance for abuse, exploitation, neglect, or violence."
]
      },
      {
        heading: "7. Integrity and Anti-Corruption",
        body: [
        "All individuals shall:",
        "• Avoid fraud, bribery, corruption, or dishonest practices.",
        "• Not offer, solicit, or accept improper gifts, favours, or benefits that could influence decision- making.",
        "• Conduct all activities with fairness, transparency, and accountability."
]
      },
      {
        heading: "8. Conflict of Interest",
        body: "Individuals must disclose any actual or potential conflict of interest that could influence their responsibilities or decisions on behalf of Islah Welfare Foundation. Personal interests should never take precedence over the interests of the Foundation or its beneficiaries."
      },
      {
        heading: "9. Confidentiality",
        body: "Confidential information relating to beneficiaries, donors, employees, volunteers, partners, or organizational operations must be protected and must not be disclosed without proper authorization, except where required by law."
      },
      {
        heading: "10. Responsible Communication",
        body: [
        "Anyone representing Islah Welfare Foundation shall:",
        "• Communicate truthfully and respectfully.",
        "• Avoid misleading or false statements.",
        "• Respect the privacy and dignity of beneficiaries.",
        "• Use the Foundation's name, logo, and branding only with proper authorization."
]
      },
      {
        heading: "11. Compliance with Laws",
        body: "All activities undertaken on behalf of Islah Welfare Foundation must comply with applicable laws, regulations, organizational policies, and contractual obligations."
      },
      {
        heading: "12. Reporting Misconduct",
        body: "Anyone who becomes aware of misconduct, unethical behaviour, policy violations, fraud, corruption, safeguarding concerns, or illegal activities is encouraged to report the matter through the Foundation's grievance or reporting mechanism. Islah Welfare Foundation will treat reports seriously and, where appropriate, confidentially. Retaliation against individuals who report concerns in good faith will not be tolerated."
      },
      {
        heading: "13. Non-Compliance",
        body: [
        "Failure to comply with this Code of Conduct may result in appropriate action,",
        "including:",
        "• Counselling or corrective measures",
        "• Suspension of responsibilities",
        "• Termination of employment, membership, partnership, sponsorship, or volunteer engagement",
        "• Reporting to relevant authorities where required by law"
]
      },
      {
        heading: "14. Policy Review",
        body: "This Code of Conduct may be reviewed by Islah Welfare Foundation and updated periodically to reflect changes in legal requirements, organizational practices, and safeguarding standards. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "15. Governing Law",
        body: "This Code of Conduct shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "16. Contact Us",
        body: "If you have any questions regarding this Code of Conduct, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
      },
      {
        heading: "17. Our Commitment",
        body: "At Islah Welfare Foundation, we believe that integrity, compassion, accountability, and respect are the foundation of meaningful social change. Every person associated with IWF shares the responsibility of upholding these values and contributing to a safe, ethical, transparent, and inclusive environment that serves communities with dignity and professionalism."
      },
    ]
  },
  "governance-policy": {
    title: "Governance Policy",
    subtitle: "Organizational framework guiding Trustees, Advisory Board, and Executive leadership.",
    category: "Governance & Ethics",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation is committed to maintaining high standards of governance by promoting ethical leadership, accountability, transparency, responsible financial management, and effective decision-making in accordance with applicable laws and the Foundation's governing documents."
      },
      {
        heading: "3. Governance Principles",
        body: [
        "The Foundation is guided by the following principles:",
        "• Integrity and ethical leadership",
        "• Transparency and accountability",
        "• Good governance and responsible management",
        "• Compliance with applicable laws and regulations",
        "• Fairness, inclusiveness, and non-discrimination",
        "• Community participation and stakeholder engagement",
        "• Sustainability and long-term organizational growth"
]
      },
      {
        heading: "4. Governing Body",
        body: [
        "The Governing Body/Board of Trustees is responsible for providing strategic",
        "direction and oversight of the Foundation. Its responsibilities include:",
        "• Defining the Foundation's vision, mission, and strategic objectives.",
        "• Approving policies, programs, and annual plans.",
        "• Ensuring financial accountability and responsible use of resources.",
        "• Monitoring organizational performance and impact.",
        "• Ensuring compliance with legal, statutory, and regulatory requirements.",
        "• Safeguarding the Foundation's assets, reputation, and public trust."
]
      },
      {
        heading: "5. Management",
        body: [
        "The management team is responsible for implementing the decisions of the",
        "Governing Body and overseeing the day-to-day operations of the Foundation. Management shall:",
        "• Implement approved programs and projects.",
        "• Ensure effective administration and financial management.",
        "• Maintain accurate organizational records.",
        "• Report regularly to the Governing Body.",
        "• Promote transparency and operational efficiency."
]
      },
      {
        heading: "6. Accountability",
        body: [
        "Islah Welfare Foundation is accountable to:",
        "• Beneficiaries",
        "• Donors and Sponsors",
        "• Members and Volunteers",
        "• Government Authorities",
        "• Funding Agencies",
        "• Partners",
        "• The Public The Foundation is committed to responsible decision-making and transparent reporting."
]
      },
      {
        heading: "7. Financial Governance",
        body: [
        "Islah Welfare Foundation shall maintain strong financial governance by:",
        "• Keeping accurate books of accounts.",
        "• Implementing appropriate internal financial controls.",
        "• Preparing financial reports and budgets.",
        "• Conducting audits where required.",
        "• Ensuring funds are used for approved charitable purposes."
]
      },
      {
        heading: "8. Ethics and Conflict of Interest",
        body: [
        "Trustees, employees, volunteers, members, and partners shall:",
        "• Act honestly and in the best interests of the Foundation.",
        "• Avoid conflicts of interest.",
        "• Disclose any actual or potential conflict promptly.",
        "• Refrain from using their position for personal benefit."
]
      },
      {
        heading: "9. Transparency",
        body: [
        "Islah Welfare Foundation is committed to transparency by:",
        "• Publishing key organizational information where appropriate.",
        "• Maintaining clear financial and operational records.",
        "• Providing accurate information to stakeholders.",
        "• Responding responsibly to stakeholder enquiries."
]
      },
      {
        heading: "10. Risk Management",
        body: [
        "The Foundation will take reasonable measures to identify, assess, and manage",
        "organizational risks relating to:",
        "• Financial management",
        "• Program implementation",
        "• Legal compliance",
        "• Safeguarding",
        "• Data protection",
        "• Operational continuity",
        "• Reputation"
]
      },
      {
        heading: "11. Compliance",
        body: "Islah Welfare Foundation shall comply with all applicable laws, regulations, statutory requirements, and report obligations governing charitable and non-profit organizations."
      },
      {
        heading: "12. Policy Review",
        body: "This Governance Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and organizational best practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "13. Governing Law",
        body: "This Governance Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "14. Contact Us",
        body: "If you have any questions regarding this Governance Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "15. Our Commitment",
        body: "Islah Welfare Foundation is committed to maintaining the highest standards of governance, accountability, and ethical leadership. Through transparent decision-making, responsible management, and effective oversight, we strive to ensure that every resource entrusted to us is used efficiently and responsibly to create meaningful, sustainable, and lasting impact for rural and underserved communities."
      },
    ]
  },
  "financial-transparency-policy": {
    title: "Financial Transparency Policy",
    subtitle: "Principles of responsible stewardship, computerized accounting controls, and statutory audit compliance.",
    category: "Governance & Ethics",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: [
        "Islah Welfare Foundation is committed to maintaining transparent financial",
        "practices by:",
        "• Maintaining accurate and complete financial records.",
        "• Using funds responsibly and only for legitimate organizational purposes.",
        "• Ensuring accountability in financial decision-making.",
        "• Complying with applicable legal, regulatory, and statutory requirements.",
        "• Promoting ethical financial management and good governance."
]
      },
      {
        heading: "3. Sources of Funds",
        body: [
        "The Foundation may receive financial support from:",
        "• Individual Donations",
        "• Membership Fees",
        "• Sponsorships",
        "• CSR Contributions",
        "• Grants from Government or Non-Government Organizations",
        "• Philanthropic Foundations",
        "• Institutional Funding",
        "• Fundraising Campaigns",
        "• Other lawful sources consistent with the Foundation's objectives"
]
      },
      {
        heading: "4. Utilization of Funds",
        body: [
        "Funds received by Islah Welfare Foundation shall be utilized for:",
        "• Charitable programs and projects",
        "• Community development initiatives",
        "• Education and healthcare programs",
        "• Rural development and livelihood initiatives",
        "• Relief and rehabilitation activities",
        "• Organizational administration and program management",
        "• Capacity building and operational expenses necessary for achieving the Foundation's objectives Certain programs or fundraising campaigns may include administrative or program management costs, as disclosed in the relevant policy or campaign information."
]
      },
      {
        heading: "5. Financial Controls",
        body: [
        "To ensure financial integrity, IWF will:",
        "• Maintain proper books of accounts.",
        "• Follow approved financial procedures and internal controls.",
        "• Ensure appropriate authorisation for financial transactions.",
        "• Maintain supporting documents for receipts and expenditures.",
        "• Safeguard organisational assets and financial resources."
]
      },
      {
        heading: "6. Financial Reporting",
        body: [
        "The Foundation is committed to preparing financial reports in accordance with applicable accounting standards and legal requirements. Where appropriate, Islah Welfare Foundation",
        "may publish:",
        "• Annual Reports",
        "• Audited Financial Statements",
        "• Program Financial Summaries",
        "• Donor Utilization Reports",
        "• Impact and Accountability Reports These reports may be made available on the Foundation's website or provided to stakeholders as appropriately."
]
      },
      {
        heading: "7. Audit and Compliance",
        body: "Islah Welfare Foundation shall ensure that its accounts are reviewed and audited, where required, by qualified professionals in accordance with applicable laws. The Foundation will comply with all statutory reporting, taxation, and regulatory obligations applicable to its operations."
      },
      {
        heading: "8. Donor Accountability",
        body: "Islah Welfare Foundation values the trust placed in it by donors and supporters. Where donations are received for specific projects or programs, the Foundation will make reasonable efforts to utilize such funds for the intended purpose. If implementation becomes impractical or circumstances change, funds may be redirected to similar charitable activities in accordance with the relevant policy, donor agreement, and applicable law."
      },
      {
        heading: "9. Fraud Prevention",
        body: "IWF maintains a zero-tolerance approach to fraud, corruption, bribery, financial misconduct, or misuse of organizational resources. Any suspected financial irregularity will be investigated appropriately, and necessary action will be taken in accordance with organizational policies and applicable laws."
      },
      {
        heading: "10. Conflict of Interest",
        body: "Individuals involved in financial decisions must always disclose any actual or potential conflict of interest and act in the best interests of the Foundation."
      },
      {
        heading: "11. Public Accountability",
        body: "IWF is committed to maintaining public confidence through openness and responsible governance. Subject to legal, contractual, and confidentiality obligations, the Foundation may share relevant financial information with donors, partners, regulators, and other stakeholders."
      },
      {
        heading: "12. Policy Review",
        body: "This Financial Transparency Policy may be reviewed by Islah Welfare Foundation and updated periodically to reflect changes in legal requirements, organizational practices, and safeguarding standards. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "13. Governing Law",
        body: "This Financial Transparency Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "14. Contact Us",
        body: [
        "If you have any questions regarding this Financial Transparency Policy, please contact",
        "us:",
        "Islah Welfare Foundation",
        "Email: info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
]
      },
      {
        heading: "15. Our Commitment",
        body: "At Islah Welfare Foundation, transparency and accountability are fundamental to everything we do. We are committed to managing every contribution with honesty, responsibility, and care, ensuring that resources are used efficiently to maximise social impact and improve the lives of rural and underserved communities. By maintaining strong financial governance and open reporting, we strive to earn and preserve the trust of our donors, partners, beneficiaries, and the public."
      },
    ]
  },
  "anti-fraud-policy": {
    title: "Anti-Fraud & Anti-Corruption Policy",
    subtitle: "Zero-tolerance rules against fraud, bribery, embezzlement, or abuse of organizational authority.",
    category: "Governance & Ethics",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation has zero tolerance for fraud, corruption, bribery, embezzlement, financial misconduct, abuse of authority, or any unethical or illegal practice. Every person associated with the Foundation is responsible for protecting the organization’s assets, reputation, and public trust."
      },
      {
        heading: "3. Scope",
        body: [
        "This policy applies to:",
        "• Trustees and Governing Body Members",
        "• Employees",
        "• Volunteers",
        "• Members",
        "• Mentors",
        "• Consultants",
        "• Interns",
        "• Contractors",
        "• Vendors and Suppliers",
        "• Partners and Sponsors",
        "• Any individual or organization acting on behalf of Islah Welfare Foundation"
]
      },
      {
        heading: "4. Definitions",
        body: [
        "Fraud: Any intentional act intended to deceive or obtain an unlawful or unfair benefit, including:",
        "• Misappropriation of funds or assets",
        "• False accounting or financial reporting",
        "• Forgery or falsification of documents",
        "• Theft or embezzlement",
        "• Payroll or procurement fraud",
        "• Misuse of organizational property",
        "Corruption: The abuse of entrusted power for personal or organizational gain, including:",
        "• Bribery",
        "• Kickbacks",
        "• Unauthorized commissions",
        "• Abuse of authority",
        "• Favouritism or nepotism",
        "• Conflict of interest resulting in improper benefit"
]
      },
      {
        heading: "5. Prohibited Conduct",
        body: [
        "No person associated with IWF shall:",
        "• Offer, solicit, or accept bribes or illegal payments.",
        "• Misappropriate or misuse of Foundation funds or assets.",
        "• Submit false claims, invoices, receipts, or documents.",
        "• Manipulate procurement or recruitment processes.",
        "• Falsify financial or program records.",
        "• Conceal fraud or unethical conduct.",
        "• Use organizational resources for personal benefit without authorization.",
        "• Engage in money laundering or any unlawful financial activity."
]
      },
      {
        heading: "6. Gifts and Hospitality",
        body: "Employees, trustees, volunteers, and representatives shall not accept or offer gifts, hospitality, or benefits that could improperly influence decisions or create a conflict of interest. Modest, customary tokens of appreciation may be accepted only where permitted by organizational policy and applicable law."
      },
      {
        heading: "7. Financial Controls",
        body: [
        "To minimize the risk of fraud and corruption, Islah Welfare Foundation will:",
        "• Maintain appropriate internal financial controls.",
        "• Ensure segregation of financial responsibilities where practicable.",
        "• Maintain accurate books of accounts.",
        "• Require proper approval for financial transactions.",
        "• Conduct periodic financial reviews and audits.",
        "• Maintain supporting documentation for all financial activities."
]
      },
      {
        heading: "8. Conflict of Interest",
        body: "All individuals associated with Islah Welfare Foundation must disclose any actual, potential, or perceived conflict of interest that may influence decision-making. Conflicts must be managed in a transparent and ethical manner."
      },
      {
        heading: "9. Reporting Concerns",
        body: "Anyone who suspects fraud, corruption, bribery, or unethical conduct is encouraged to report the matter promptly through the Foundation's designated reporting or grievance mechanism. Reports may be made in good faith without fear of retaliation."
      },
      {
        heading: "10. Investigation",
        body: "All reported concerns will be reviewed appropriately, fairly, and confidentially. Where necessary, IWF may conduct internal investigations or refer matters to the appropriate authorities in accordance with applicable laws."
      },
      {
        heading: "11. Protection Against Retaliation",
        body: "Islah Welfare Foundation will not tolerate retaliation against any individual who reports suspected fraud or corruption honestly and in good faith or who cooperates with an investigation."
      },
      {
        heading: "12. Consequences of Violations",
        body: [
        "Violations of this policy may result in appropriate action, including:",
        "• Disciplinary action",
        "• Suspension or termination of employment or engagement",
        "• Cancellation of membership, partnership, or sponsorship",
        "• Recovery of financial losses, where legally permissible",
        "• Reporting to law enforcement or regulatory authorities where required"
]
      },
      {
        heading: "13. Training and Awareness",
        body: "Islah Welfare Foundation will promote awareness of this policy through orientation, training, and communication, encouraging ethical behaviour and responsible financial management across the organization."
      },
      {
        heading: "14. Policy Review",
        body: "This Anti-Fraud & Anti-Corruption Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and organizational best practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "15. Governing Law",
        body: "This Anti-Fraud & Anti-Corruption Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "16. Contact Us",
        body: [
        "If you have any questions regarding this Anti-Fraud & Anti-Corruption Policy, please",
        "contact us:",
        "Islah Welfare Foundation",
        "Email: info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
]
      },
      {
        heading: "17. Our Commitment",
        body: "At Islah Welfare Foundation, integrity is fundamental to our mission. We are committed to conducting all activities honestly, transparently, and responsibly while safeguarding the resources entrusted to us. Through strong governance, ethical leadership, and accountability, we strive to maintain the confidence of our beneficiaries, donors, partners, regulators, and the communities we serve."
      },
    ]
  },
  "grievance-policy": {
    title: "Grievance Redressal Policy",
    subtitle: "Fair, transparent, and confidential procedure for addressing concerns from beneficiaries, donors, and partners.",
    category: "Governance & Ethics",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "1. Purpose",
        body: "We are committed to maintaining transparency, accountability, fairness, and ethical practices in all our activities. We value the feedback, concerns, and suggestions of our beneficiaries, donors, members, volunteers, partners, employees, and the public. This Grievance Redressal Policy provides a fair and transparent mechanism for addressing complaints and resolving grievances in a timely and respectful manner."
      },
      {
        heading: "2. Who Can Submit a Grievance? A grievance may be submitted by",
        body: [
        "• Beneficiaries",
        "• Donors and Sponsors",
        "• Members",
        "• Volunteers",
        "• Employees",
        "• Partners",
        "• Vendors",
        "• Community Members",
        "• Any individual affected by Islah Welfare Foundation's activities"
]
      },
      {
        heading: "3. Types of Grievances",
        body: [
        "Grievances may relate to:",
        "• Program implementation",
        "• Staff or volunteer conduct",
        "• Financial transparency",
        "• Donations and fundraising",
        "• Discrimination or harassment",
        "• Service quality",
        "• Website-related issues",
        "• Any unethical or inappropriate behaviour",
        "How to Submit a Grievance: You may submit your grievance through:",
        "Islah Welfare Foundation",
        "Email: grievance@iwfindia.org, info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
]
      },
      {
        heading: "4. Resolution Process",
        body: [
        "• Every grievance will be acknowledged upon receipt.",
        "• Complaints will be reviewed confidentially and fairly.",
        "• Appropriate action will be taken after necessary verification.",
        "• The complainant will be informed of the outcome at an appropriate time wherever applicable. Confidentiality: All grievances will be handled with strict confidentiality. Personal information will only be used for the purpose of investigating and resolving the complaint."
]
      },
      {
        heading: "5. Right to Amend",
        body: "This Grievance Redressal Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. The updated version will be published on website with the revised effective date."
      },
      {
        heading: "6. Governing Law",
        body: "This Grievance Redressal Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "7. Contact Us",
        body: "If you have any questions regarding this Grievance Redressal Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
      },
      {
        heading: "8. Our Commitment",
        body: "IWF is committed to resolving grievances in a transparent, impartial, and timely manner while promoting accountability, trust, and continuous improvement in all our programs and services. We value your feedback and are committed to strengthening our work through open communication and responsible governance."
      },
    ]
  },
  "child-protection-policy": {
    title: "Child Protection & Safeguarding Policy",
    subtitle: "Zero-tolerance rules against abuse, neglect, exploitation, or harm across all child & youth programs.",
    category: "Programs & Operations",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation has zero tolerance for any form of child abuse, exploitation, neglect, violence, harassment, or inappropriate behaviour towards children. All employees, trustees, volunteers, consultants, interns, partners, contractors, and anyone representing Islah Welfare Foundation are expected to uphold the highest standards of child safeguarding."
      },
      {
        heading: "3. Scope",
        body: [
        "This policy applies to:",
        "• Trustees and Governing Body Members",
        "• Employees and Consultants",
        "• Volunteers and Mentors",
        "• Interns and Trainees",
        "• Program Partners",
        "• Contractors and Service Providers",
        "• Visitors participating in Islah Welfare Foundation activities It applies to all programs, events, outreach activities, online engagements, field visits, training sessions, and any other activities organized or supported by Islah Welfare Foundation."
]
      },
      {
        heading: "4. Our Commitment",
        body: [
        "IWF is committed to:",
        "• Protecting children from all forms of abuse, neglect, exploitation, and violence.",
        "• Promoting children's rights, dignity, and well-being.",
        "• Creating safe and child-friendly environments.",
        "• Treating every child with respect, fairness, and equality.",
        "• Ensuring that safeguarding concerns are addressed promptly and appropriately.",
        "• Complying with applicable child protection laws and regulations."
]
      },
      {
        heading: "5. Code of Conduct",
        body: [
        "Everyone associated with Islah Welfare Foundation shall:",
        "• Treat every child with dignity and respect.",
        "• Maintain appropriate professional boundaries.",
        "• Use respectful and appropriate language.",
        "• Ensure activities are conducted in safe environments.",
        "• Obtain appropriate consent before photographing or recording children where required.",
        "• Immediately report any safeguarding concerns.",
        "The following are strictly prohibited:",
        "• Physical, emotional, or sexual abuse.",
        "• Harassment or bullying.",
        "• Discrimination of any kind.",
        "• Exploitation or neglect.",
        "• Corporal punishment.",
        "• Inappropriate physical contact.",
        "• Inappropriate communication with children online or offline.",
        "• Using children for promotional purposes without appropriate consent and legal compliance."
]
      },
      {
        heading: "6. Safe Recruitment",
        body: [
        "Where appropriate, Islah Welfare Foundation may implement safeguarding",
        "measures such as:",
        "• Identity verification",
        "• Reference checks",
        "• Background verification where legally permissible",
        "• Safeguarding orientation and training These measures help reduce risks and promote child safety."
]
      },
      {
        heading: "7. Program Safety",
        body: [
        "Islah Welfare Foundation will endeavour to ensure that:",
        "• Activities are planned with child safety in mind.",
        "• Children are supervised appropriately.",
        "• Facilities used for programs are reasonably safe.",
        "• Risks are identified and managed.",
        "• Staff and volunteers understand safeguarding responsibilities."
]
      },
      {
        heading: "8. Reporting Concerns",
        body: "Anyone associated with IWF who becomes aware of suspected abuse, neglect, exploitation, or safeguarding concerns involving a child should report the matter immediately through the Foundation's designated reporting mechanism. All reports will be treated seriously, confidentially, and handled in accordance with applicable laws and organizational procedures."
      },
      {
        heading: "9. Confidentiality",
        body: "Information relating to safeguarding concerns will be shared only with individuals who need the information for appropriate action, legal compliance, or child protection purposes. Islah Welfare Foundation will respect confidentiality while prioritising the safety and best interests of the child."
      },
      {
        heading: "10. Photography and Media",
        body: "Photographs, videos, or personal information relating to children will only be collected, used, or published responsibly and, where required, with appropriate consent from parents, legal guardians, or authorised representatives, and in compliance with applicable law. Content that could compromise a child's privacy, dignity, or safety will not be published."
      },
      {
        heading: "11. Training and Awareness",
        body: "Islah Welfare Foundation is committed to promoting safeguarding awareness through appropriate orientation, training, guidance, and awareness activities for staff, volunteers, and program stakeholders."
      },
      {
        heading: "12. Legal Compliance",
        body: "Islah Welfare Foundation will strive to comply with all applicable child protection and safeguarding laws, regulations, and government guidelines in the jurisdictions where it operates. Where required by law, safeguarding concerns may be reported to the appropriate authorities."
      },
      {
        heading: "13. Right to Amend",
        body: "This Child Protection & Safeguarding Policy may be reviewed and updated periodically to reflect changes in legal requirements, organizational practices, and safeguarding standards. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "14. Governing Law",
        body: "This Child Protection & Safeguarding Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "15. Contact Us",
        body: [
        "If you have any questions regarding this Child Protection & Safeguarding Policy,",
        "please contact us:",
        "Islah Welfare Foundation",
        "Email: info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
]
      },
      {
        heading: "16. Our Commitment",
        body: "At Islah Welfare Foundation, every child deserves to grow up in a safe, nurturing, inclusive, and respectful environment. We are committed to protecting children from harm and promoting their well-being through responsible safeguarding practices, ethical conduct, and a culture of care and accountability."
      },
    ]
  },
  "medical-treatment-policy": {
    title: "Fundraising for Critical Medical Treatment Policy",
    subtitle: "Governing direct hospital disbursements, cost allocations, shortfall management, and surplus transfers.",
    category: "Programs & Operations",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Individual Medical Fundraising Campaigns",
        body: "Each fundraising campaign is launched based on information and supporting medical documents provided by the beneficiary or their authorized representative. The campaign specifies an estimated treatment cost, which serves as the fundraising target. Actual treatment expenses may vary depending on the patient's medical condition, hospital requirements, and treatment progress."
      },
      {
        heading: "3. Administrative & Fund Management Cost",
        body: "To support the planning, verification, fundraising, campaign management, payment processing, documentation, compliance, monitoring, communication, and overall administration of medical fundraising activities, \"normally, 20% of the total funds raised may be utilized towards administrative, staffs costs, campaign management, compliance, verification, payment processing, monitoring, and program management expenses incurred in operating of the organization (Islah Welfare Foundation). The actual percentage applied may vary depending on the circumstances of each situation\"."
      },
      {
        heading: "4. Where Total Funds collected are less than the estimated Treatment Cost",
        body: [
        "If the total amount",
        "raised for an individual beneficiary is less than the estimated treatment cost:",
        "• Islah Welfare Foundation may allocate up to 20% of the total amount collected towards administrative and program management expenses and other organization operating expenses.",
        "• The remaining amount will be utilized exclusively towards the beneficiary's eligible medical treatment and related approved medical expenses.",
        "• Donors acknowledge that, in such cases, the total amount collected may not be sufficient to fully meet the beneficiary's treatment requirements."
]
      },
      {
        heading: "5. Where Total Funds collected exceed the required Treatment Cost",
        body: [
        "If the total amount collected",
        "exceeds the amount reasonably required for the beneficiary's eligible medical treatment:",
        "a) The beneficiary's verified medical expenses shall be paid first.",
        "b) Administrative and program management costs, as provided under this policy, may be retained",
        "by Islah Welfare Foundation.",
        "c) Any remaining surplus amount shall not be refunded to individual donors.",
        "d) The surplus shall be reappropriated and transferred to general Health & Well-Being Fund and",
        "utilized for:",
        "• Critical medical treatment assistance",
        "• Emergency healthcare support",
        "• Medical aid for economically weaker patients",
        "• Health camps and community healthcare initiatives",
        "• Other healthcare programs consistent with the charitable objectives of Islah Welfare Foundation"
]
      },
      {
        heading: "6. Change in Treatment Circumstances",
        body: [
        "If any of the following occurs:",
        "• Treatment is completed at a lower cost;",
        "• Treatment is discontinued;",
        "• The beneficiary no longer requires assistance;",
        "• The beneficiary becomes ineligible;",
        "• The beneficiary unfortunately passes away before full utilization of the funds;",
        "• The hospital or medical provider refuses or returns payment; Then, after settlement of all verified eligible medical expenses and applicable administrative costs, any remaining balance shall be reappropriated and transferred to general Health & Well-Being Fund for use in supporting other eligible medical beneficiaries and healthcare initiatives."
]
      },
      {
        heading: "7. Payment of Medical Assistance",
        body: [
        "Wherever reasonably possible, payments shall be made directly",
        "to:",
        "• Hospitals",
        "• Medical institutions",
        "• Pharmacies",
        "• Diagnostic centers",
        "• Other authorized healthcare providers Direct payment to beneficiaries may be made only where appropriate documentation and verification are available accordingly necessary."
]
      },
      {
        heading: "8. Verification",
        body: [
        "Islah Welfare Foundation reserves the right to:",
        "• Verify medical documents.",
        "• Verify beneficiary identity.",
        "• Obtain treatment updates.",
        "• Seek additional supporting documents.",
        "• Suspend or discontinue fundraising if false, misleading, or fraudulent information is discovered."
]
      },
      {
        heading: "9. Donor Consent",
        body: [
        "By donating, donors acknowledge and agree that:",
        "• Donations are voluntary and irrevocable.",
        "• Donations support charitable medical assistance programs.",
        "• Funds will be managed in accordance with this policy.",
        "• Treatment costs are estimates and may increase or decrease.",
        "• Surplus funds may be transferred to the IWF Medical Assistance Fund as described in this policy.",
        "• Donations are generally non-refundable except where required by law or in cases of duplicate or erroneous transactions."
]
      },
      {
        heading: "10. Transparency",
        body: [
        "Islah Welfare Foundation is committed to maintaining proper records of:",
        "• Funds received",
        "• Medical disbursements",
        "• Administrative allocations",
        "• Surplus transfers",
        "• Program utilization These records shall be maintained in accordance with applicable laws and internal governance procedures."
]
      },
      {
        heading: "11. Right to Amend",
        body: "This Fundraising for Critical Medical Treatment Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this privacy policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on website with the revised effective date."
      },
      {
        heading: "12. Governing Law",
        body: "This Fundraising for Critical Medical Treatment Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "13. Contact us",
        body: [
        "If you have any questions regarding this Fundraising for Critical Medical Treatment",
        "Policy, please contact us:",
        "Islah Welfare Foundation",
        "Email: info@iwfindia.org",
        "Website: www.iwfindia.org",
        "Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi 110025, India."
]
      },
      {
        heading: "14. Our Commitment",
        body: "Every donation—big or small—helps us create meaningful save life. We are committed to using your contribution with integrity, accountability, and transparency to advance our mission of safe life in critical medical emergency."
      },
    ]
  },
  "employment-policy": {
    title: "Employment Policy",
    subtitle: "Equal opportunity recruitment standards, workplace safety, performance feedback, and staff conduct.",
    category: "Programs & Operations",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Equal Employment Opportunity",
        body: "Islah Welfare Foundation is an equal opportunity employer. Employment decisions are made based on qualifications, experience, competence, integrity, and organizational requirements. We do not discriminate on the basis of race, religion, caste, gender, age, disability, marital status, or any other characteristic protected under applicable law."
      },
      {
        heading: "3. Recruitment",
        body: [
        "Recruitment shall be conducted through a fair and transparent process. Selection",
        "may include:",
        "• Application screening",
        "• Interviews",
        "• Skill or written assessments (where applicable)",
        "• Reference and background verification (where appropriate) Employment is subject to the Foundation's requirements and available positions."
]
      },
      {
        heading: "4. Employment Categories",
        body: [
        "IWF may engage individuals under various categories, including:",
        "• Full-Time Employees",
        "• Part-Time Employees",
        "• Contractual Employees",
        "• Project-Based Staff",
        "• Consultants",
        "• Interns",
        "• Apprentices",
        "• Volunteers (not employees) The applicable terms and conditions will be communicated at the time of engagement."
]
      },
      {
        heading: "5. Code of Conduct",
        body: [
        "All employees are expected to:",
        "• Perform their duties honestly, professionally, and responsibly.",
        "• Treat colleagues, beneficiaries, donors, volunteers, and partners with dignity and respect.",
        "• Maintain confidentiality of organizational and beneficiary information.",
        "• Avoid conflicts of interest.",
        "• Comply with organizational policies and applicable laws.",
        "• Protect the reputation and assets of Islah Welfare Foundation. Harassment, discrimination, fraud, corruption, violence, or any form of unethical behaviour will not be tolerated."
]
      },
      {
        heading: "6. Compensation and Benefits",
        body: [
        "Compensation, allowances, and benefits shall be determined based",
        "on:",
        "• Role and responsibilities",
        "• Qualifications and experience",
        "• Organizational policies",
        "• Project funding availability",
        "• Applicable laws and regulations Any additional benefits will be governed by the employee's appointment letter or employment agreement."
]
      },
      {
        heading: "7. Working Hours and Leave",
        body: "Employees shall follow the working hours, holidays, and leave provisions communicated by IWF in accordance with organizational requirements and applicable labour laws."
      },
      {
        heading: "8. Health, Safety & Well-being",
        body: "Islah Welfare Foundation is committed to providing a safe, respectful, and healthy workplace. Employees are expected to comply with safety procedures and promptly report any workplace hazards, accidents, or concerns."
      },
      {
        heading: "9. Child Protection & Safeguarding",
        body: "Employees working with children or vulnerable individuals must comply with IWF's Child Protection & Safeguarding Policy and all safeguarding requirements."
      },
      {
        heading: "10. Performance and Professional Development",
        body: "Islah Welfare Foundation encourages continuous learning and professional growth. Employees may receive performance feedback, training opportunities, and capacity-building support based on organizational needs and available resources."
      },
      {
        heading: "11. Confidentiality",
        body: "Employees must protect confidential information relating to the Foundation, beneficiaries, donors, partners, and other stakeholders during and after employment, unless disclosure is authorized or required by law."
      },
      {
        heading: "12. Resignation and Termination",
        body: "Employment may end through resignation, completion of contract, retirement, mutual agreement, or termination in accordance with the employment agreement, organizational policies, and applicable laws. Islah Welfare Foundation reserves the right to take disciplinary action, including termination, in cases of misconduct, policy violations, fraud, or unlawful behaviour."
      },
      {
        heading: "13. Limitation of employee",
        body: [
        "Employee in Islah Welfare Foundation:",
        "• Does not create an agency, partnership, or ownership relationship.",
        "• Does not entitle employees to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize employees to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "14. Policy Review",
        body: "This Employment Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "15. Governing Law",
        body: "This Employment Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "16. Contact Us",
        body: "If you have any questions regarding this Employment Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "17. Our Commitment",
        body: "At Islah Welfare Foundation, we believe that dedicated and motivated employees are essential to achieving lasting social impact. We are committed to fostering a workplace built on integrity, professionalism, equality, collaboration, and respect, where every team member can contribute meaningfully to improving the lives of rural and underserved communities."
      },
    ]
  },
  "donation-policy": {
    title: "Donation Policy",
    subtitle: "Terms governing voluntary donations, Section 80G tax exemptions, and Form 10BE certificate issuance.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "8. Purpose",
        body: "This Donation Policy outlines the principles governing donations made to Islah Welfare Foundation, we are committed to ensuring that all donations are managed responsibly, transparently, and in accordance with applicable laws and our charitable objectives."
      },
      {
        heading: "9. Voluntary Contributions",
        body: "All donations made to Islah Welfare Foundation are voluntary. Donors may contribute through our website, bank transfer, UPI, cheque, demand draft, or other approved payment methods."
      },
      {
        heading: "10. Use of Donations",
        body: [
        "Donations received by Islah Welfare Foundation are used to support the",
        "Foundation's charitable programs and organizational objectives, including but not limited to:",
        "• Education and scholarships",
        "• Healthcare and medical support",
        "• Skill development and livelihood promotion",
        "• Women empowerment",
        "• Relief and rehabilitation",
        "• Agriculture and rural development",
        "• Environmental conservation",
        "• Model village development",
        "• Child and community welfare",
        "• Administrative and operational expenses necessary for implementing charitable activities Unless specifically designated by the donor and accepted by Islah Welfare Foundation, donations may be allocated to the area of greatest need as determined by the Foundation."
]
      },
      {
        heading: "11. Restricted Donations",
        body: "Where a donor specifies a particular program or project, Islah Welfare Foundation will make reasonable efforts to utilize the donation for the intended purpose. If the designated program has been completed, discontinued, becomes impractical, or sufficient funds have already been received, IWF reserves the right to redirect the donation to a similar charitable purpose consistent with its objectives."
      },
      {
        heading: "12. Proposed Projects",
        body: "Some programs and projects presented on our website proposed initiatives that may be implemented based on the availability of funds, organizational capacity, statutory approvals, partnerships, and community needs. Donations received may be utilized for these initiatives once implementation begins or, where appropriate, for other approved charitable activities aligned with the Foundation's objectives."
      },
      {
        heading: "13. Tax Benefits",
        body: "Eligible donations may qualify for tax benefits under the applicable provisions of the Income Tax Act, 2025, subject to the Foundation's registration status and prevailing laws. Donors are advised to consult their tax advisors regarding eligibility."
      },
      {
        heading: "14. Donation Receipts",
        body: "An official donation receipt will be issued for all eligible donations after successful verification of the payment. Donors are requested to provide accurate contact details to facilitate receipt generation and future communication."
      },
      {
        heading: "15. Refund Policy",
        body: [
        "Donations are generally non-refundable as they are immediately committed towards charitable activities. Refund requests may be considered only in exceptional",
        "circumstances, such as:",
        "• Duplicate transactions",
        "• Incorrect donations due to technical error",
        "• Unauthorized payment, subject to verification Approved refund requests will be processed within a reasonable period after verification."
]
      },
      {
        heading: "16. Transparency and Accountability",
        body: [
        "Islah Welfare Foundation is committed to maintaining",
        "transparency in the utilization of donations through:",
        "• Proper financial records",
        "• Internal controls and governance",
        "• Statutory compliance",
        "• Annual reports and financial disclosures, where applicable"
]
      },
      {
        heading: "17. Intellectual Property",
        body: "Membership does not grant any ownership or licensing rights over the Foundation's name, logo, publications, website, or other intellectual property. Any use requires prior written approval from Islah Welfare Foundation."
      },
      {
        heading: "18. Data Privacy",
        body: "Donor information collected during donation form will be managed in accordance with the Foundation's Privacy Policy and Personal information will not be sold, rented, or disclosed to third parties except as required by law or with the donor's consent."
      },
      {
        heading: "19. Limitation of Donor",
        body: [
        "Donor in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle donors to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize donors to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "20. Changes to this Policy",
        body: "This Donation Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "21. Governing Law",
        body: "This Donation Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "22. Contact Us",
        body: "If you have any questions regarding this Donation Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "23. Our Commitment",
        body: "Every donation—big or small—helps us create meaningful change in rural communities. We are committed to using your contribution with integrity, accountability, and transparency to advance our mission of building healthier, educated, empowered, and self-reliant communities."
      },
    ]
  },
  "volunteer-policy": {
    title: "Volunteer Policy",
    subtitle: "Rights, expectations, eligibility, safety procedures, and recognition for Islah volunteers.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation welcomes individuals from diverse backgrounds who are committed to serving communities with integrity, compassion, professionalism, and respect. Volunteering with Islah Welfare Foundation is entirely voluntary and does not create an employment relationship."
      },
      {
        heading: "3. Scope",
        body: [
        "This policy applies to:",
        "• Individual Volunteers",
        "• Student Volunteers",
        "• Professional Volunteers",
        "• Organizational Volunteers",
        "• Event Volunteers",
        "• Community Volunteers",
        "• Online/Virtual Volunteers",
        "• International Volunteers (where applicable)"
]
      },
      {
        heading: "4. Eligibility",
        body: [
        "Individuals wishing to volunteer should:",
        "• Share the mission and values of Islah Welfare Foundation.",
        "• Be willing to comply with organizational policies.",
        "• Demonstrate respectful and ethical behaviour.",
        "• Possess the skills or willingness to learn for assigned activities.",
        "• Meet any age or legal requirements applicable to specific volunteer roles. Certain volunteer positions may require identity verification, references, or background checks where appropriate."
]
      },
      {
        heading: "5. Volunteer Roles",
        body: [
        "Volunteers may support Islah Welfare Foundation in areas including:",
        "• Education and mentoring",
        "• Healthcare and medical camps",
        "• Women empowerment programs",
        "• Rural development initiatives",
        "• Environmental campaigns",
        "• Relief and rehabilitation activities",
        "• Community awareness programs",
        "• Skill development workshops",
        "• Agriculture and livelihood initiatives",
        "• Fundraising and donor engagement",
        "• Events and campaigns",
        "• Digital media, communications, and administrative support Volunteer assignments will depend on organizational needs, volunteer skills, and program requirements."
]
      },
      {
        heading: "6. Rights of Volunteers",
        body: [
        "Volunteers can expect to:",
        "• Be treated with dignity, fairness, and respect.",
        "• Work in a safe and inclusive environment.",
        "• Receive appropriate orientation and guidance.",
        "• Be informed about their roles and responsibilities.",
        "• Receive reasonable support from IWF during volunteer activities.",
        "• Be recognized and appreciated for their contribution.",
        "• Raise concerns through the Foundation's grievance mechanism without fear of retaliation."
]
      },
      {
        heading: "7. Responsibilities of Volunteers",
        body: [
        "Volunteers are expected to:",
        "• Representing Islah Welfare Foundation professionally and ethically.",
        "• Follow organizational policies and procedures.",
        "• Respect beneficiaries, staff, fellow volunteers, and community members.",
        "• Protect confidential information obtained during volunteering.",
        "• Avoid discrimination, harassment, abuse, or inappropriate behaviour.",
        "• Perform assigned responsibilities to the best of their abilities.",
        "• Report safety concerns, incidents, or misconduct promptly.",
        "• Use organizational resources responsibly."
]
      },
      {
        heading: "8. Code of Conduct",
        body: [
        "Volunteers shall:",
        "• Act honestly, respectfully, and responsibly.",
        "• Always maintain professional behaviour.",
        "• Respect cultural diversity and local customs.",
        "• Avoid conflicts of interest.",
        "• Not engage in political campaigning or activities that could compromise the Foundation's neutrality while representing Islah Welfare Foundation.",
        "• Comply with applicable laws and organizational policies."
]
      },
      {
        heading: "9. Child Protection & Safeguarding",
        body: "Volunteers working with children or vulnerable individuals must comply with Islah Welfare Foundation's Child Protection & Safeguarding Policy and any other safeguarding procedures adopted by the Foundation."
      },
      {
        heading: "10. Confidentiality",
        body: "Volunteers must maintain the confidentiality of any personal, organizational, or beneficiary information obtained during their volunteer service and must not disclose such information without proper authorization, except where required by law."
      },
      {
        heading: "11. Health and Safety",
        body: "Islah Welfare Foundation is committed to providing a reasonably safe environment for volunteer activities. Volunteers are expected to follow safety instructions, use reasonable care, and immediately report accidents, hazards, or emergencies."
      },
      {
        heading: "12. Expenses",
        body: "Unless specifically approved in writing, volunteering with Islah Welfare Foundation is unpaid, and volunteers are responsible for their own personal expenses. Where applicable and subject to prior approval, Islah Welfare Foundation may reimburse reasonable, documented expenses incurred during authorized volunteer assignments in accordance with organizational policies and available resources."
      },
      {
        heading: "13. Intellectual Property",
        body: "Materials, photographs, documents, reports, training resources, designs, and other work created by volunteers as part of authorized volunteer assignments for Islah Welfare Foundation may be used by the Foundation for its charitable, educational, promotional, or administrative purposes, subject to applicable laws."
      },
      {
        heading: "14. Termination of Volunteer Engagement",
        body: [
        "A volunteer may discontinue volunteering at any time by informing Islah Welfare Foundation. Islah Welfare Foundation reserves the right to suspend or",
        "terminate a volunteer's engagement if the volunteer:",
        "• Violates organizational policies or the Code of Conduct.",
        "• Engages in misconduct or unlawful behaviour.",
        "• Acts in a manner that may harm beneficiaries, volunteers, staff, or the reputation of the Foundation.",
        "• Is unable to fulfil the agreed volunteer responsibilities."
]
      },
      {
        heading: "15. Limitation of Volunteer",
        body: [
        "Volunteer in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle volunteers to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize volunteers to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "16. Changes to this Policy",
        body: "This Volunteer Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and organizational best practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "17. Governing Law",
        body: "This Volunteer Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "18. Contact Us",
        body: "If you have any questions regarding this Volunteer Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "19. Our Commitment",
        body: "At Islah Welfare Foundation, we believe that volunteers are the driving force behind community transformation. Through their dedication, compassion, and service, they help us build healthier, educated, empowered, and self-reliant rural communities. We are committed to providing a respectful, inclusive, and meaningful volunteering experience while working together to create lasting social impact."
      },
    ]
  },
  "partnership-policy": {
    title: "Partnership Policy",
    subtitle: "Guidelines for CSR corporate, government, NGO, institutional, and grant collaborations.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation believes that meaningful partnerships strengthen social impact, encourage innovation, and promote sustainable development. We welcome collaborations with organizations and individuals who share our values, vision, and commitment to ethical, transparent, and community-focused development."
      },
      {
        heading: "3. Eligible Partners",
        body: [
        "Islah Welfare Foundation may collaborate with:",
        "• Corporate/ Organizations",
        "• Government Departments",
        "• Educational Institutions",
        "• Healthcare Institutions",
        "• NGOs and Civil Society Organizations",
        "• Foundations and Trusts",
        "• International Development Organizations",
        "• Research Institutions",
        "• Community-Based Organizations",
        "• Professional Associations",
        "• Individual Experts and Consultants"
]
      },
      {
        heading: "4. Partnership Principles",
        body: [
        "All partnerships shall be based on:",
        "• Mutual trust and respect",
        "• Transparency and accountability",
        "• Shared values and objectives",
        "• Community participation",
        "• Ethical conduct and integrity",
        "• Non-discrimination and inclusiveness",
        "• Compliance with applicable laws and regulations",
        "• Sustainable and measurable social impact"
]
      },
      {
        heading: "5. Areas of Partnership",
        body: [
        "Partnerships may include, but are not limited to:",
        "• CSR Projects",
        "• Education & Scholarships",
        "• Healthcare & Medical Initiatives",
        "• Women Empowerment",
        "• Skill Development & Livelihood",
        "• Agriculture & Rural Development",
        "• Environment & Sustainability",
        "• Relief & Rehabilitation",
        "• Model Village Development",
        "• Research & Capacity Building",
        "• Volunteer & Employee Engagement",
        "• Digital Innovation & Technology Support",
        "• Infrastructure Development",
        "• Awareness Campaigns and Community Outreach"
]
      },
      {
        heading: "6. Partner Responsibilities",
        body: [
        "Partners are expected to:",
        "• Support the agreed objectives of the partnership.",
        "• Comply with applicable laws and regulations.",
        "• Maintain ethical and professional conduct.",
        "• Respect the rights, dignity, and privacy of beneficiaries.",
        "• Ensure transparency in activities and reporting.",
        "• Use IWF's name and logo only with prior written approval.",
        "• Avoid activities that may damage the reputation of Islah Welfare Foundation."
]
      },
      {
        heading: "7. Islah Welfare Foundation Responsibilities",
        body: [
        "Islah Welfare Foundation will:",
        "• Maintain transparency and accountability in project implementation.",
        "• Use partnership resources responsibly for agreed purposes.",
        "• Provide regular communication and progress updates where applicable.",
        "• Ensure compliance with applicable legal and regulatory requirements.",
        "• Foster collaborative and respectful working relationships."
]
      },
      {
        heading: "8. Financial Management",
        body: [
        "Where financial contributions are made:",
        "• Funds shall be utilized in accordance with the agreed project objectives.",
        "• Proper financial records and supporting documentation shall be maintained.",
        "• Financial reporting may be provided as agreed in the partnership arrangement.",
        "• Unused or surplus funds, if any, shall be managed according to the partnership agreement and applicable laws."
]
      },
      {
        heading: "9. Branding & Public Communication",
        body: [
        "Partners may acknowledge their association with Islah",
        "Welfare Foundation only after obtaining prior written approval. The use of:",
        "• Islah Welfare Foundation name",
        "• Logo",
        "• Publications",
        "• Photographs",
        "• Videos",
        "• Project materials It must comply with Islah Welfare Foundation 's branding and communication guidelines."
]
      },
      {
        heading: "10. Confidentiality",
        body: "Both Islah Welfare Foundation and its partners shall maintain the confidentiality of any non-public information shared during the partnership, except where disclosure is required by law or agreed in writing."
      },
      {
        heading: "11. Conflict of Interest",
        body: "Partners shall disclose any actual or potential conflict of interest that may affect the partnership. Islah Welfare Foundation reserves the right to take appropriate action to ensure transparency and impartiality."
      },
      {
        heading: "12. Suspension or Termination",
        body: [
        "Islah Welfare Foundation may suspend or terminate a partnership if:",
        "• The partner violates applicable laws or regulations.",
        "• The partner engages in fraud, corruption, discrimination, or unethical practices.",
        "• The partner breaches the terms of the partnership agreement.",
        "• The partnership no longer aligns with Islah Welfare Foundation's mission, values, or strategic objectives. Termination shall be carried out in accordance with the applicable agreement and legal requirements."
]
      },
      {
        heading: "13. Limitation of Partnership",
        body: [
        "Partnership in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle partners to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize partners to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "14. Policy Review",
        body: "This Partnership Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "15. Governing Law",
        body: "This Partnership Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "16. Contact Us",
        body: "If you have any questions regarding this Partnership Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "17. Our Commitment",
        body: "At Islah Welfare Foundation, we believe that lasting social change is achieved through collaboration. By partnering with organizations, institutions, businesses, and community leaders, we can create greater opportunities, expand our impact, and build healthier, educated, empowered, and self-reliant rural communities. Together, we can make a meaningful and sustainable difference."
      },
    ]
  },
  "sponsorship-policy": {
    title: "Sponsorship Policy",
    subtitle: "Rules for program, project, event, and in-kind sponsorships and sponsor recognition.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation welcomes sponsorship from individuals, corporations, institutions, foundations, and other organizations that share our commitment to sustainable rural development, education, healthcare, women empowerment, environmental conservation, and community welfare. All sponsorships shall support the Foundation's charitable activities without compromising its independence, integrity, or public trust."
      },
      {
        heading: "3. Types of Sponsorship",
        body: [
        "Sponsorship may include, but is not limited to:",
        "• Program Sponsorship",
        "• Project Sponsorship",
        "• Event Sponsorship",
        "• Education Sponsorship",
        "• Healthcare Sponsorship",
        "• Women Empowerment Sponsorship",
        "• Agriculture & Rural Development Sponsorship",
        "• Environment & Sustainability Sponsorship",
        "• Relief & Rehabilitation Sponsorship",
        "• Infrastructure & Equipment Sponsorship",
        "• Capacity Building & Training Sponsorship",
        "• In-kind Sponsorship (goods, equipment, or professional services)"
]
      },
      {
        heading: "4. Eligibility of Sponsors",
        body: [
        "Islah Welfare Foundation may accept sponsorships from:",
        "• Corporate organizations",
        "• Business enterprises",
        "• Trusts and Foundations",
        "• Educational Institutions",
        "• Healthcare Organizations",
        "• Government Agencies",
        "• Development Partners",
        "• Philanthropists",
        "• Individual Sponsors Islah Welfare Foundation reserves the right to decline any sponsorship that conflicts with its mission, values, legal obligations, or ethical standards."
]
      },
      {
        heading: "5. Use of Sponsorship Funds",
        body: "Sponsorship funds or resources shall be used for the purpose agreed upon by the sponsor and Islah Welfare Foundation. Where a sponsored program is completed, discontinued, becomes impractical, or cannot be implemented due to unforeseen circumstances, Islah Welfare Foundation may, after informing the sponsor where reasonably practicable, utilize the sponsorship for a similar charitable program consistent with its objectives."
      },
      {
        heading: "6. Sponsor Recognition",
        body: [
        "Subject to mutual agreement, Islah Welfare Foundation may acknowledge",
        "sponsors through:",
        "• Website recognition",
        "• Annual Reports",
        "• Programmed publications",
        "• Newsletters",
        "• Social media platforms",
        "• Events and public communications",
        "• Certificates of Appreciation Recognition does not imply endorsement of the sponsor's products, services, or commercial activities."
]
      },
      {
        heading: "7. Branding & Use of Logo",
        body: "The use of Islah Welfare Foundation's name, logo, trademarks, or promotional materials by sponsors require prior written approval from the Foundation. Similarly, Islah Welfare Foundation will use the sponsor's name or logo only with permission and in accordance with the agreed sponsorship arrangement."
      },
      {
        heading: "8. Transparency & Accountability",
        body: [
        "Islah Welfare Foundation is committed to:",
        "• Maintaining proper financial records.",
        "• Using sponsorship funds responsibly.",
        "• Implementing projects with transparency and accountability.",
        "• Providing progress updates or utilization reports where agreed.",
        "• Complying with applicable legal and regulatory requirements."
]
      },
      {
        heading: "9. Ethical Standards",
        body: "IWF will not knowingly accept sponsorship from organizations or individuals whose activities are inconsistent with the Foundation's mission, public interest, or applicable laws. The Foundation reserves the right to refuse or discontinue sponsorship that may adversely affect its reputation, independence, or charitable objectives."
      },
      {
        heading: "10. Confidentiality",
        body: "Any confidential information shared between Islah Welfare Foundation and a sponsor shall be protected and used only for the purposes of the sponsorship, except where disclosure is required by law or mutually agreed."
      },
      {
        heading: "11. Conflict of Interest",
        body: "Any actual or potential conflict of interest relating to a sponsorship arrangement must be disclosed promptly. Islah Welfare Foundation will take appropriate steps to ensure impartiality, transparency, and good governance."
      },
      {
        heading: "12. Suspension or Termination",
        body: [
        "Islah Welfare Foundation reserves the right to suspend or terminate",
        "a sponsorship arrangement if:",
        "• The sponsor breaches the sponsorship agreement.",
        "• The sponsorship is found to involve unlawful or unethical activities.",
        "• The sponsor's conduct damages the reputation or credibility of Islah Welfare Foundation.",
        "• The sponsorship becomes inconsistent with the Foundation's mission or applicable laws."
]
      },
      {
        heading: "13. Limitation of Sponsorship",
        body: [
        "Sponsorship in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle sponsors to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize sponsors to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "14. Policy Review",
        body: "This Sponsorship Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "15. Governing Law",
        body: "This Sponsorship Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "16. Contact Us",
        body: "If you have any questions regarding this Sponsorship Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "17. Our Commitment",
        body: "Islah Welfare Foundation values every sponsor as a partner in creating meaningful and sustainable social impact. Through ethical collaboration, transparency, and shared responsibility, we strive to transform lives and build healthier, educated, empowered, and self- reliant rural communities. Together, we can create lasting change for those who need it most."
      },
    ]
  },
  "mentorship-policy": {
    title: "Mentorship Policy",
    subtitle: "Framework for connecting rural students, youth, and women with experienced professional mentors.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "19. Scope",
        body: "This policy applies to all mentors associated with Islah Welfare Foundation, including professionals, academicians, industry experts, entrepreneurs, retired professionals, and volunteers who provide mentoring services through the Foundation."
      },
      {
        heading: "20. Objectives",
        body: [
        "The objectives of the Mentorship Programme are to:",
        "• Provide guidance, knowledge, and career support to beneficiaries.",
        "• Encourage personal, educational, and professional development.",
        "• Promote leadership, innovation, and lifelong learning.",
        "• Strengthen employability, entrepreneurship, and livelihood opportunities.",
        "• Support community development through knowledge sharing."
]
      },
      {
        heading: "21. Eligibility",
        body: [
        "Individuals may apply to become mentors if they:",
        "• Possess relevant education, professional experience, or subject expertise.",
        "• Demonstrate integrity, professionalism, and commitment to social service.",
        "• Agree to comply with Islah Welfare Foundation's policies, including the Code of Conduct and Child Protection & Safeguarding Policy.",
        "• Successfully complete any required screening or verification process."
]
      },
      {
        heading: "22. Roles and Responsibilities",
        body: [
        "Mentors are expected to:",
        "• Provide guidance in a professional, respectful, and supportive manner.",
        "• Encourage learning, confidence, and ethical decision-making.",
        "• Maintain confidentiality of information shared during mentoring.",
        "• Respect diversity, inclusion, and individual dignity.",
        "• Avoid discrimination, harassment, or inappropriate behaviour.",
        "• Report safeguarding or ethical concerns where applicable.",
        "• Represent IWF responsibly during mentoring activities."
]
      },
      {
        heading: "23. Areas of Mentorship",
        body: [
        "Mentorship may be provided in areas such as:",
        "• Career Guidance",
        "• Education and Academic Support",
        "• Skill Development",
        "• Entrepreneurship and Business Development",
        "• Agriculture and Rural Development",
        "• Women's Empowerment",
        "• Digital Literacy",
        "• Financial Literacy",
        "• Leadership Development",
        "• Healthcare Awareness",
        "• Personal Development",
        "• Community Development"
]
      },
      {
        heading: "24. Code of Conduct",
        body: [
        "Mentors shall:",
        "• Act honestly, professionally, and ethically.",
        "• Respect the privacy and dignity of mentees.",
        "• Maintain appropriate professional boundaries.",
        "• Avoid conflicts of interest.",
        "• Not seeking personal, financial, or commercial benefits from mentees.",
        "• Comply with all applicable laws and organizational policies."
]
      },
      {
        heading: "25. Child Protection and Safeguarding",
        body: "Mentors working with children or vulnerable individuals must comply with Islah Welfare Foundation's Child Protection & Safeguarding Policy. Any concerns regarding abuse, neglect, exploitation, or inappropriate conduct must be reported immediately."
      },
      {
        heading: "26. Confidentiality",
        body: "Mentors shall protect confidential information relating to mentees, beneficiaries, and the Foundation. Confidential information shall not be disclosed without appropriate authorization or where required by law."
      },
      {
        heading: "27. Recognition",
        body: [
        "Islah Welfare Foundation may recognize mentors through:",
        "• Certificates of Appreciation",
        "• Recognition on the Foundation's website or events",
        "• Training and networking opportunities",
        "• Other non-financial recognition programmes Recognition does not create an employment relationship unless separately agreed in writing."
]
      },
      {
        heading: "28. Termination",
        body: [
        "IWF reserves the right to suspend or discontinue a mentor's association in cases of:",
        "• Violation of organizational policies.",
        "• Misconduct or unethical behaviour.",
        "• Safeguarding concerns.",
        "• Breach of confidentiality.",
        "• Misrepresentation of the Foundation.",
        "• Any action that may harm the interests or reputation of Islah Welfare Foundation."
]
      },
      {
        heading: "29. Limitation of Mentorship",
        body: [
        "Mentorship in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle mentors to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize mentors to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "30. Policy Review",
        body: "This Mentorship Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "31. Governing Law",
        body: "This Mentorship Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "32. Contact Us",
        body: "If you have any questions regarding this Mentorship Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "33. Our Commitment",
        body: "Islah Welfare Foundation believes that knowledge shared with compassion can transform lives. Through our Mentorship Programme, we connect experienced professionals with individuals seeking guidance, creating opportunities for learning, leadership, and sustainable development. Together, we aim to build confident individuals, stronger communities, and a brighter future through mentorship founded on integrity, respect, and service."
      },
    ]
  },
  "membership-policy": {
    title: "Membership Policy",
    subtitle: "Principles, rights, categories, responsibilities, fees, duration, and conduct for Islah members.",
    category: "Supporters & Engagement",
    effectiveDate: "01/04/2026",
    sections: [
      {
        heading: "2. Policy Statement",
        body: "Islah Welfare Foundation welcomes individuals who share the Foundation's vision, values, and charitable objectives. Members are encouraged to actively support the Foundation through participation, advocacy, volunteering, donations, and community engagement. Membership does not create ownership, employment, or financial rights over the Foundation or its assets."
      },
      {
        heading: "3. Eligibility",
        body: [
        "Membership is open to individuals who:",
        "• Support the objectives and mission of Islah Welfare Foundation.",
        "• Agree to abide by the Foundation's policies and Code of Conduct.",
        "• Submit the prescribed membership application.",
        "• Pay the applicable membership fee (if any).",
        "• Are approved by the Foundation in accordance with its membership procedures. Islah Welfare Foundation reserves the right to accept or decline any membership application."
]
      },
      {
        heading: "4. Membership Categories",
        body: [
        "The Foundation may offer different categories of membership, such as:",
        "• Lifetime Member",
        "• Ordinary Member",
        "• Supporting Member",
        "• Organizational/Institutional Member",
        "• Honorary Member Specific eligibility criteria, benefits, and fees for each category may be determined by Islah Welfare Foundation from time to time."
]
      },
      {
        heading: "5. Rights of Members",
        body: [
        "Members may:",
        "• Participate in Foundation programs and activities.",
        "• Receive updates, newsletters, and organizational communications.",
        "• Volunteer and contribute to community initiatives.",
        "• Participate in awareness campaigns, meetings, or events organised by Islah Welfare Foundation, where applicable.",
        "• Provide constructive suggestions to strengthen the Foundation's work. Membership does not automatically confer voting rights, governance authority, or eligibility for election to the Governing Body unless specifically provided under the Foundation's governing documents."
]
      },
      {
        heading: "6. Responsibilities of Members",
        body: [
        "Members are expected to:",
        "• Uphold the mission, vision, and values of Islah Welfare Foundation.",
        "• Maintain ethical and respectful conduct.",
        "• Follow the Foundation's policies and guidelines.",
        "• Protect the reputation and integrity of the Foundation.",
        "• Respect fellow members, volunteers, staff, beneficiaries, and community members.",
        "• Avoid conflicts of interest.",
        "• Keep membership information accurate and up to date."
]
      },
      {
        heading: "7. Membership Fees",
        body: [
        "Where applicable:",
        "• Membership fees shall be determined by Islah Welfare Foundation.",
        "• Fees are payable in accordance with the applicable membership category.",
        "• Membership fees are generally non-refundable and non-transferable, except where required by applicable law or approved by the Foundation under exceptional circumstances."
]
      },
      {
        heading: "8. Membership Duration & Renewal",
        body: "Membership shall remain valid for the period applicable to the chosen membership category. Renewal may be required before the expiry date to continue membership benefits. Failure to renew may result in the automatic lapse of membership."
      },
      {
        heading: "9. Suspension or Termination",
        body: [
        "Islah Welfare Foundation reserves the right to suspend or terminate",
        "membership if a member:",
        "• Violates the Foundation's policies or Code of Conduct.",
        "• Provides false or misleading information.",
        "• Engages in unlawful, unethical, or inappropriate conduct.",
        "• Acts in a manner that harms the Foundation, its beneficiaries, or its reputation.",
        "• Use the Foundation's name or logo without authorization. Membership may also end upon resignation by the member."
]
      },
      {
        heading: "1. Intellectual Property",
        body: "Membership does not grant any ownership or licensing rights over the Foundation's name, logo, publications, website, or other intellectual property. Any use requires prior written approval from Islah Welfare Foundation."
      },
      {
        heading: "2. Data Privacy",
        body: "Personal information collected during membership registration will be managed in accordance with the Foundation's Privacy Policy and applicable data protection laws."
      },
      {
        heading: "3. Limitation of Membership",
        body: [
        "Membership in Islah Welfare Foundation:",
        "• Does not create an employment, agency, partnership, or ownership relationship.",
        "• Does not entitle members to financial benefits, remuneration, or reimbursement unless separately approved.",
        "• Does not authorize members to represent or make commitments on behalf of Islah Welfare Foundation without written authorization."
]
      },
      {
        heading: "4. Changes to this Policy",
        body: "This Membership Policy will be reviewed by Islah Welfare Foundation periodically to ensure it remains effective, relevant, and consistent with legal requirements and best organizational practices. Islah Welfare Foundation reserves the right to amend this policy at any time to comply with applicable laws, regulatory requirements, and organizational needs. Updated version will be published on this page with the revised effective date."
      },
      {
        heading: "5. Governing Law",
        body: "This Membership Policy shall be governed by and interpreted in accordance with the laws of the Republic of India. Any disputes arising from the use of this website shall be subject to the Darbhanga jurisdiction of the competent courts."
      },
      {
        heading: "6. Contact Us",
        body: "If you have any questions regarding this Membership Policy, please contact us: Islah Welfare Foundation Email: info@iwfindia.org Website: www.iwfindia.org Administrative Office: B 144, Abul Fazal Enclave II, Okhla, New Delhi, Delhi-110025, India."
      },
      {
        heading: "7. Our Commitment",
        body: "At Islah Welfare Foundation, our members are an integral part of our mission to build healthier, educated, empowered, and self-reliant rural communities. Together, through shared values, responsible participation, and community service, we strive to create lasting social impact and sustainable development for all."
      },
    ]
  },
};
