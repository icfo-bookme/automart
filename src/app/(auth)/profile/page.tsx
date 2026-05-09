// app/update-profile/page.tsx

import UpdateProfilePage from '@/components/PrivateComponents/UpdateProfilePage';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';


export default function Page() {
    return (
        <PrivateRoute>
            <UpdateProfilePage />
        </PrivateRoute>
    );
}