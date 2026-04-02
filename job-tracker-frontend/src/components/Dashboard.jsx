import { BarChart, XAxis, YAxis, Tooltip, Bar, LabelList } from "recharts"

function Dashboard ({stats}) {
    const data = [
        {name: "Total", value: stats.total, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Applied", value: stats.applied, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Interview",value: stats.interview, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Rejected",value: stats.rejected, fill:"oklch(48.8% 0.243 264.376)"}
    ]
    console.log(data)
    return(
        <div className="h-3/4 mr-4 flex flex-1 rounded-xl bg-zinc-800/50 shadow-xl">
            
            <BarChart style={{ width: "100%", hover:"none"}} responsive data={data}>
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Bar dataKey="value" radius={[6,6,0,0]}>
                    <LabelList dataKey="value" position="top" fill="white"/>
                </Bar>
            </BarChart> 

        </div>
    )
}

export default Dashboard