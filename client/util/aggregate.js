export default function aggregate(rows) {
  const data = {};
  console.log(rows[0]);
  rows.forEach((row) => {
    if (!data.hasOwnProperty(row.client)) {
      data[row.client] = {};
    }
    if (!data[row.client].hasOwnProperty(row.project)) {
      data[row.client][row.project] = {
        hours: 0,
        billableHours: 0,
        billableAmount: 0,
      };
    }
    // aggregate hours
    data[row.client][row.project].hours += row.hours;
    // aggregate billable hours
    const isBillable = row.billable;
    if (isBillable) {
      data[row.client][row.project].billableHours += row.hours;
      // aggregate billable amount
      data[row.client][row.project].billableAmount +=
        row.hours * row.billable_rate;
    }
  });
  return data;
}
