'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${session?.user.id}/posts`
			);
			const data = await response.json();
			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async (post) => {};

	return (
		<div>
			<Profile
				name='My'
				desc='welcome to your personalized profile'
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default MyProfile;
