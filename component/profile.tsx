'use client';
import { useEffect } from 'react';
import { useFetchUserQuery } from '@/store/Features/auth/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '@/store/Features/auth/auth-slice';
import { RootState } from '@/store/store';

export default function ProfilePage() {
  const dispatch = useDispatch();
const { data: userResponse, isLoading, isError } = useFetchUserQuery();

  const profile = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
  if (userResponse?.data) {
    dispatch(setUser(userResponse.data));
  } else if (isError) {
    dispatch(clearUser());
  }
}, [userResponse, isError, dispatch]);

  if (isLoading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-4">
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          {profile.shippingAddress ? (
            <div className="space-y-1">
    <p>{profile.shippingAddress.street}</p>
    <p>{profile.shippingAddress.city}, {profile.shippingAddress.state} {profile.shippingAddress.zip}</p>
      
    </div>
          ) : (
            <p>No shipping address saved.</p>
          )}
        </div>
      </div>
    </div>
  );
}
