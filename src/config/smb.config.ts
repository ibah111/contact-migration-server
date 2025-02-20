export const smb = () => ({
  share: process.env.share,
  domain: process.env.domain,
  smb_username: process.env.smb_username,
  smb_password: process.env.smb_password,
});
