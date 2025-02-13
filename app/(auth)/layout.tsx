export default function AuthLayout({
    children
   }: {
    children: React.ReactNode;
   }) {
     return (
       <main className="h-[100dvh] flex justify-center items-center bg-slate-100">
         { children }
       </main>
     );
   }