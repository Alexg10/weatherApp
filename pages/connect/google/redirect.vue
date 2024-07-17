<script setup lang="ts">
const { authenticateProvider } = useStrapiAuth();
const route = useRoute();
const router = useRouter();

await authenticateProvider("google", route.query.access_token);
router.push("/");
</script>
