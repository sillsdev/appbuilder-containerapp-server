<script>
    import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

    export let pack;
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
            <Button href="/admin">View Package</Button>
        </Container>
    </Section>
</Html>

<style>
</style>
