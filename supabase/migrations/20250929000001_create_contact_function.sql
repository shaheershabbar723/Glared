/*
  # Create Contact Form Function
  This migration creates a PostgreSQL function to handle contact form submissions securely.
*/

-- Create a function to handle contact form submissions
CREATE OR REPLACE FUNCTION public.submit_contact_form(
  contact_name text,
  contact_email text,
  contact_phone text DEFAULT NULL,
  contact_subject text DEFAULT '',
  contact_message text DEFAULT ''
)
RETURNS uuid AS $$
DECLARE
  new_contact_id uuid;
BEGIN
  -- Insert the contact form data
  INSERT INTO public.contacts (name, email, phone, subject, message)
  VALUES (contact_name, contact_email, contact_phone, contact_subject, contact_message)
  RETURNING id INTO new_contact_id;
  
  -- Return the ID of the newly created contact
  RETURN new_contact_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.submit_contact_form TO anon;