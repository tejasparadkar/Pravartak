import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";

type Job = {
  jobTitle: string;
  jobCompany: string;
  jobSalary: string;
  deadline: string;
};

type Props = {
  data: Job[];
};
export const RecentSales: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-8">
      {data &&
        data.map((job, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
              <AvatarFallback>
                {job.jobTitle.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{job.jobTitle}</p>
              <p className="text-sm text-muted-foreground">{job.jobCompany}</p>
            </div>
            <Badge className="ml-auto font-medium">{job.jobSalary}</Badge>
          </div>
        ))}
    </div>
  );
};
