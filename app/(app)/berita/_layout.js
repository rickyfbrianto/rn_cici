import { Stack } from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const BeritaLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerTitle: "Berita", headerShown: false }} />
            <Stack.Screen name='[id]' options={{ headerTitle: "Berita", headerShown: false }} />
            <Stack.Screen name='berita_tambah' options={{ headerTitle: "Tambah Berita", headerLeft: () => <BackButtonHeader to={"berita"} /> }} />
            {/* <Stack.Screen name='edit/[id_edit]' options={{ headerTitle: "Edit User", headerLeft: () => <BackButtonHeader to={"users"} /> }} /> */}
        </Stack>
    )
}

export default BeritaLayout