<script>
    import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';
    import { PUBLIC_DEPLOYMENT_LINK } from '$env/static/public';

    export let pack;
    const link = `${PUBLIC_DEPLOYMENT_LINK}/admin`;
</script>

<Html lang="en">
    <Head />
    <Preview preview="Welcome to svelte email" />
    <Section>
        <Container>
            <Text>Hello Admin!</Text>
            <Text>A new package has come in and is pending review.</Text>
            <Text>Details:</Text>
            <Container>
                <Text>Language: {pack.app_lang.name}</Text>
                <Text>Region: {pack.app_lang.regionname}</Text>
                <Text>Language Code: {pack.app_lang.iso639_3.toUpperCase()}</Text>
            </Container>
            <Button href={link}>View Package</Button>
        </Container>
    </Section>
</Html>

<style>
</style>
