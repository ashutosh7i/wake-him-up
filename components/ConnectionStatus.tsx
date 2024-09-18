import { Card, CardBody } from "@nextui-org/card";

interface ConnectionStatusProps {
  message: string;
  msgtype: 'success' | 'error' | 'info' | 'log';
}

export default function ConnectionStatus({ message, msgtype }: ConnectionStatusProps) {
  let textColor = 'text-white';
  let borderColor = 'border-gray-500';

  switch (msgtype) {
    case 'success':
      textColor = 'text-green-500';
      borderColor = 'border-green-500';
      break;
    case 'error':
      textColor = 'text-red-500';
      borderColor = 'border-red-500';
      break;
    case 'info':
        textColor = 'text-white';
        borderColor = 'border-gray-500';
        break;
    case 'log':
      textColor = 'text-yellow-500';
      borderColor = 'border-yellow-500';
      break;
    default:
      textColor = 'text-white';
      borderColor = 'border-gray-500';
  }

  return (
    <Card className={`mt-8 bg-gray-800 ${textColor} border-1 ${borderColor} w-60 h-10 flex items-center justify-center rounded-lg`}>
      <CardBody className="py-2 px-4 text-center">
        <span className={`text-md font-semibold`}>{message}</span>
      </CardBody>
    </Card>
  );
}
