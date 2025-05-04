export interface Company {
    id: number,
    name: string,
    ticker: string,
    industry: string,
    capital: number,
    enterprise_value: number,
    revenue: number,
    net_profit: number,
    pe: number,
    ps: number,
    pb: number,
    ev_ebitda: number,
    ebitda_margin: number,
    debt_ebitda: number,
    report: string,
    year: number,
    image: string
}

export interface Option {
    id: number,
    name: string
}