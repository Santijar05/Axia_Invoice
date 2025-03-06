export default function Storelayout({
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
  