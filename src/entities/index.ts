/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: doctors
 * Interface for Doctors
 */
export interface Doctors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  doctorName?: string;
  /** @wixFieldType text */
  specializations?: string;
  /** @wixFieldType text */
  qualifications?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType url */
  credentialVerificationUrl?: string;
  /** @wixFieldType number */
  successRate?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType text */
  biography?: string;
}


/**
 * Collection ID: hospitals
 * Interface for Hospitals
 */
export interface Hospitals {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  hospitalType?: string;
  /** @wixFieldType text */
  hospitalName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  city?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  accreditationStatus?: string;
  /** @wixFieldType text */
  treatmentSpecialties?: string;
  /** @wixFieldType text */
  costRange?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  hospitalImage?: string;
  /** @wixFieldType url */
  websiteURL?: string;
}


/**
 * Collection ID: inquiries
 * Interface for PatientInquiries
 */
export interface PatientInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  patientName?: string;
  /** @wixFieldType text */
  patientEmail?: string;
  /** @wixFieldType text */
  patientPhone?: string;
  /** @wixFieldType text */
  countryOfResidence?: string;
  /** @wixFieldType text */
  inquirySubject?: string;
  /** @wixFieldType text */
  inquiryMessage?: string;
  /** @wixFieldType text */
  preferredContactMethod?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
}


/**
 * Collection ID: postcareguides
 * Interface for PostCareGuides
 */
export interface PostCareGuides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  guideTitle?: string;
  /** @wixFieldType text */
  guideDescription?: string;
  /** @wixFieldType text */
  recoverySteps?: string;
  /** @wixFieldType text */
  followUpCare?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  guideImage?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: treatmentcosts
 * Interface for TreatmentCosts
 */
export interface TreatmentCosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  procedureName?: string;
  /** @wixFieldType number */
  surgeonFees?: number;
  /** @wixFieldType number */
  otCharges?: number;
  /** @wixFieldType number */
  hospitalStayCost?: number;
  /** @wixFieldType number */
  accommodationCost?: number;
  /** @wixFieldType number */
  localTransportCost?: number;
  /** @wixFieldType number */
  totalEstimatedCost?: number;
  /** @wixFieldType text */
  currency?: string;
}
