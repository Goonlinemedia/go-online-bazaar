import { z } from 'zod'

// ===========================================
// HELPER: UK Phone Number Validation
// ===========================================
export const validateUKPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('44')) {
    return digits.length === 12 && (digits.startsWith('447') || digits.startsWith('441') || digits.startsWith('442'))
  } else if (digits.startsWith('0')) {
    return digits.length === 11 && (digits.startsWith('07') || digits.startsWith('01') || digits.startsWith('02') || digits.startsWith('03'))
  } else if (digits.startsWith('7')) {
    return digits.length === 10
  }

  return false
}

// ===========================================
// HELPER: Nigerian Phone Number Validation
// ===========================================
export const validateNGPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('234')) {
    return digits.length === 13 && (digits.startsWith('2347') || digits.startsWith('2348') || digits.startsWith('2349') || digits.startsWith('2341'))
  } else if (digits.startsWith('0')) {
    return digits.length === 11 && (digits.startsWith('07') || digits.startsWith('08') || digits.startsWith('09') || digits.startsWith('01'))
  } else if (digits.startsWith('7') || digits.startsWith('8') || digits.startsWith('9')) {
    return digits.length === 10
  }

  return false
}

// ===========================================
// HELPER: Unified Phone Number Validation
// ===========================================
export const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return false

  // Try Nigerian format
  if (validateNGPhone(phone)) return true

  // Try UK format
  if (validateUKPhone(phone)) return true

  // General international format fallback (standard E.164 lengths)
  return digits.length >= 10 && digits.length <= 15
}

// ===========================================
// CONTACT/ENQUIRY FORM SCHEMA
// ===========================================
export const enquiryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes and dots'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase(),

  mobile: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .refine(
      (val) => !val || validatePhone(val),
      'Please enter a valid phone number (e.g. +234 708 115 0770 or 0803 123 4567)'
    )
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  agreedToTerms: z
    .boolean()
    .refine(val => val === true, 'You must agree to the terms and privacy policy'),
})

export type EnquiryFormData = z.infer<typeof enquiryFormSchema>

// ===========================================
// NEWSLETTER SCHEMA
// ===========================================
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// ===========================================
// HELPER: Get first validation error message
// ===========================================
export const getFirstError = (error: z.ZodError): string => {
  return error.issues[0]?.message || 'Validation failed'
}

// ===========================================
// HELPER: Get all validation errors as object
// ===========================================
export const getFieldErrors = (error: z.ZodError): Record<string, string> => {
  const errors: Record<string, string> = {}
  error.issues.forEach((err: z.ZodIssue) => {
    const path = err.path.join('.')
    if (!errors[path]) {
      errors[path] = err.message
    }
  })
  return errors
}
