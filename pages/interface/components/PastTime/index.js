import { format, formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import { Tooltip } from '@/TabNewsUI';

function formatTooltipLabel(date, gmt = false) {
  const displayFormat = gmt ? "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm z" : "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm";

  try {
    return format(new Date(date), displayFormat, { locale: ptBR });
  } catch (e) {
    return '';
  }
}

export default function PastTime({ date, formatText, ...props }) {
  const [tooltipLabel, setTooltipLabel] = useState(formatTooltipLabel(date, true));

  useEffect(() => {
    setTooltipLabel(formatTooltipLabel(date));
  }, [date]);

  function getText(date) {
  try {
    const postDate = new Date(date);
    const now = new Date();

    // Se a data do post for no futuro, retorna "agora mesmo"
    if (postDate > now) {
      return 'agora mesmo';
    }

    const formattedDate = formatDistanceToNowStrict(postDate, {
      locale: ptBR,
    });

    return formatText ? formatText(formattedDate) : `${formattedDate} atrás`;
  } catch (e) {
    return '';
  }
}

  return (
    <Tooltip text={tooltipLabel} suppressHydrationWarning {...props}>
      <time dateTime={date} style={{ whiteSpace: 'nowrap' }} suppressHydrationWarning>
        {getText(date)}
      </time>
    </Tooltip>
  );
}
