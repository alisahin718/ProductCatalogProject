import React from 'react'
import HistoryTable from '../components/caseHistory/HistoryTable'

const CaseHistoryPage = () => {
  return (
    <div>
        <HistoryTable tableName="Aldıklarım" url = 'https://localhost:7234/api/CaseHistories/purchased'/>
        <HistoryTable tableName="Sattıklarım" url = 'https://localhost:7234/api/CaseHistories/sold'/>

    </div>
  )
}

export default CaseHistoryPage