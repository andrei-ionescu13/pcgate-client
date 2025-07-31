import { Divider } from '@/components/divider';
import { AccountWebsiteSettings } from 'app/[locale]/(main)/account/account-website-settings';
import Head from 'next/head';
import { AccountSecurity } from './account-security';

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
