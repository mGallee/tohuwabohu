import { execSync } from 'child_process';

if (process.env.VERCEL_ENV === 'preview') {
  console.log('Preview deployment detected, running seed...');
  execSync('payload run ./src/seed/index.ts', { stdio: 'inherit' });
} else {
  console.log('Not a preview deployment, skipping seed');
}
