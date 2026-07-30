import { Divider } from '@/components/divider';
import Head from 'next/head';
import { AccountSecurity } from './account-security';
import { AccountWebsiteSettings } from './account-website-settings';

export default function Account() {
  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>
      <div>
        <h4>Account Settings</h4>
        <Divider className="my-8" />
        <div className="grid gap-10">
          <AccountSecurity />
          <AccountWebsiteSettings />
        </div>
      </div>
    </>
  );
}
