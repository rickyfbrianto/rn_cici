import { Stack } from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const UserLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerTitle: "User", headerShown: false }} />
            {/* <Stack.Screen name='[id]' options={{ headerTitle: "Jadwal Nikah", headerShown: false }} /> */}
            <Stack.Screen name='user_tambah' options={{ headerTitle: "Tambah User", headerLeft: () => <BackButtonHeader to={"users"} /> }} />
            <Stack.Screen name='edit/[id_edit]' options={{ headerTitle: "Edit User", headerLeft: () => <BackButtonHeader to={"users"} /> }} />
        </Stack>
    )
}

export default UserLayout