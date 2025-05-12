import Card from "@/src/components/atoms/Card";

export default function MetricCards() {
  const metrics = [
    { title: "PURCHASES OF THE MONTH", description: "425,120", color: "bg-blue-400" },
    { title: "SALES OF THE DAY", description: "89,540", color: "bg-[#1e3c8b]" },
    { title: "PRODUCT ROTATION", description: "12,589", color: "bg-blue-400" },
    { title: "SERVICE", description: "78,458", color: "bg-[#1e3c8b]" },
    { title: "SUPPLIERS", description: "245", color: "bg-[#1e3c8b]" },
    { title: "CUSTOMERS", description: "1,589", color: "bg-blue-400" },
    { title: "BEST KNOWN IN 30 DAYS", description: "15,789", color: "bg-[#1e3c8b]" },
    { title: "PENDING ORDERS", description: "458", color: "bg-blue-400" },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((metric, index) => (
        <div key={index} className="w-full xs:max-w-[300px] mx-auto">
          <Card 
            color={metric.color} 
            title={metric.title} 
            description={metric.description} 
          />
        </div>
      ))}
    </div>
  );
}
