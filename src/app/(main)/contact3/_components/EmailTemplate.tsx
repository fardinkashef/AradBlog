type EmailTemplateProps = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export function EmailTemplate({
  firstName,
  lastName,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <p>
        From: {firstName} {lastName}
      </p>
      <p>Email: {email}</p>
      <p>{message}</p>
    </div>
  );
}
