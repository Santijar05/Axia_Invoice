export default function Boxlayout({
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
  