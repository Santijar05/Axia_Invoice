export default function Saleslayout({
    children
}: {
    children: React.ReactNode;
}){
    return (
        <main className="h-[100dvh] flex justify-center items-center bg-black">
            { children }
        </main>
    );
}  
  