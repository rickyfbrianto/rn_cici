import { Stack } from 'expo-router'
import BackButtonHeader from '../../../components/BackButtonHeader'

const BeritaLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerTitle: "Berita", headerShown: false }} />
            <Stack.Screen name='[id]' options={{ headerTitle: "Berita", headerShown: false }} />
            <Stack.Screen name='berita_tambah' options={{ headerTitle: "Tambah Berita", headerLeft: () => <BackButtonHeader to={"berita"} /> }} />
            <Stack.Screen name='edit/[id_edit]' options={{ headerTitle: "Edit Berita", headerLeft: () => <BackButtonHeader to={"berita"} /> }} />

            {/* Keuangan */}
            <Stack.Screen name='keuangan/[id]' options={{ headerTitle: "Berita Keuangan", headerShown: false }} />
            <Stack.Screen name='keuangan/keuangan_tambah' options={{ headerTitle: "Tambah Berita Keuangan", headerLeft: () => <BackButtonHeader to={"berita"} /> }} />
            <Stack.Screen name='keuangan/edit/[id_edit]' options={{ headerTitle: "Edit Berita", headerLeft: () => <BackButtonHeader to={"berita"} /> }} />
        </Stack>
    )
}

export default BeritaLayout