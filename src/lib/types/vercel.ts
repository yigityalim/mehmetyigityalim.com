export type VercelProject = {
    projects: {
        accountId: string
        autoExposeSystemEnvs: boolean
        autoAssignCustomDomains: boolean
        autoAssignCustomDomainsUpdatedBy: 'system'
        buildCommand: unknown
        createdAt: number
        crons: Crons
        devCommand: unknown
        directoryListing: boolean
        env: ENV[]
        framework: string
        gitForkProtection: boolean
        gitLFS: boolean
        id: string
        installCommand: unknown
        lastRollbackTarget: unknown
        lastAliasRequest: unknown
        name: string
        nodeVersion: string
        outputDirectory: unknown
        publicSource: unknown
        rootDirectory: string
        serverlessFunctionRegion: string
        sourceFilesOutsideRootDirectory: boolean
        updatedAt: number
        live: boolean
        gitComments: GitComments
        link: Link
        latestDeployments: LatestDeployments[]
        targets: any[]
    }[]
    pagination: { count: number; next: number; prev: number }
}

type Crons = {
    enabledAt: number
    disabledAt: number
    updatedAt: number
    deploymentId: string
    definitions: any[]
}

type ENV = {
    type: string
    key: string
    value: string
    target: any[]
    configurationId: string
    createdAt: number
    updatedAt: number
    createdBy: string
    updatedBy: string
    id: string
}

type GitComments = {
    onCommit: boolean
    onPullRequest: boolean
}

type Link = {
    type: string
    repo: string
    repoId: number
    org: string
    gitCredentialId: string
    productionBranch: string
    sourceless: boolean
    createdAt: number
    updatedAt: number
    deployHooks: any[]
}

type LatestDeployments = {
    alias: any[]
    aliasAssigned: number
    aliasError: unknown
    automaticAliases: any[]
    builds: any[]
    createdAt: number
    createdIn: string
    creator: any
    deploymentHostname: string
    forced: true
    id: string
    meta: unknown
    name: string
    plan: string
    private: boolean
    readyState: string
    readySubstate: string
    target: string
    teamId: unknown
    type: string
    url: string
    userId: string
    withCache: boolean
    buildingAt: number
    readyAt: number
    previewCommentsEnabled: boolean
}
