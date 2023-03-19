import Link from "next/link";

function Error({ statusCode }: { statusCode: number }) : JSX.Element {

    return <main 
        style={{
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            width: "100%", 
            height: "100svh",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)"
        }}
    >
    {
        statusCode 
        &&   
        <>
        <h1 style={{fontSize: "4rem"}}>{ statusCode }</h1>
        <div style={{width: "2rem"}} />
        <p style={{fontSize: "1.5rem"}}>{ GetMessage(statusCode) }</p>
        </>
        ||
        !statusCode
        &&
        <p>{ "Kliens oldali hiba történt!" }</p>
    }
    <br/>
    <Link href="/" style={{
        color: "var(--text-color)", 
        textDecoration: "none",
        padding: "0.5rem 1rem",
        border: "2px solid var(--text-color)",
        borderRadius: "0.3rem",
        fontSize: "1.1rem"
    }}>Vissza a kezdőlapra</Link>
    </main>;
}

Error.getInitialProps = ({ res, err } : { res: any, err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode };
}

function GetMessage(statusCode: number): string {
    
    if (statusCode === 404)
        return "Az oldal nem található!";

    return "Ismeretlen hiba történt!"
}

export default Error;