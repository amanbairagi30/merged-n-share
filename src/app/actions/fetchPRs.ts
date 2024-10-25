'use server';

import { revalidatePath } from 'next/cache';

export async function fetchPRs(username: string | undefined, orgName: string) {
  if (!username || !orgName) {
    throw new Error('Missing username or organization name');
  }

  const token = process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN;
  if (!token) {
    throw new Error('GitHub token is not set');
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${username}+org:${orgName}+is:merged`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('GitHub API Error:', response.status, errorBody);
      throw new Error(
        `Failed to fetch PR details: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    revalidatePath('/');
    return data;
  } catch (error) {
    console.error('Error fetching PR details:', error);
    throw new Error('An error occurred while fetching PR details');
  }
}
