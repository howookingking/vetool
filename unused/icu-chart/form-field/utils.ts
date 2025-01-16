export const formatOrderName = (name: string, type: string) => {
  if (type === 'injection') {
    const parts = name.split('#')

    if (parts.length > 1) {
      name = parts[0] + '#' + parts[1] + 'ml/kg ' + parts.slice(2).join('#')
    }
  }

  return name.replaceAll('#', ' ')
}

export const renderOrderSubComment = (orderType: string) => {
  if (orderType === 'fluid') return 'ml/hr'
  if (orderType === 'feed') return '/회'
}

export const parsingOrderName = (orderType: string, orderName: string) => {
  if (orderType === 'fluid') {
    const [fluidName, method, fold, additives] = orderName.split('#')
    return `${fluidName}  ${additives ? `+ ${additives}` : ''} `
  }

  if (orderType === 'feed') {
    const [dietName, dietDescription] = orderName.split('#')
    return `${dietName} ${dietDescription ? `/ ${dietDescription}` : ''}`
  }

  return orderName
}

export const calculateTotalDrugAmount = (
  patientWeight: string,
  drugDosage: string,
  drugTotalUnit: string,
  drugMassVolume: number,
) => {
  const base = (Number(drugDosage) * Number(patientWeight)) / drugMassVolume
  const total = drugTotalUnit === 'ul' ? base * 1000 : base

  return total.toFixed(2)
}
