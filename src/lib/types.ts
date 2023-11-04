export type Locale = 'tr-TR' | 'en-US'

// ----------------------------------------------------------
// HYGRAPH TYPES
export type Blog = {
    id: string
    title: string
    slug: string
    coverPhoto: Photo
    content: {
        raw: {
            children: {
                type: string
                children: {
                    text: string
                }[]
            }[]
        }
    }
    postColor: { hex: string }
    datePublished: string
    author: Author
}

export type Blogs = Array<Blog>
export type Author = {
    id: string
    name: string
    surname: string
    email: string
    age: number
    picture: Photo
    slug: string
    programmingLanguages: ProgrammingLanguage[]
    about: {
        raw: {
            children: {
                type: string
                children: {
                    text: string
                }[]
            }[]
        }
    }
    social: Social[]
    blogs: Blog[]
}
type ProgrammingLanguage = {
    id: string
    name: string
    color: { hex: string }
}

type Photo = {
    url: string
    width: number
    height: number
}

type Social = {
    id: string
    title: string
    url: string
}

export type User = {
    id: number
    name: string
    surname: string
    username: string
    email: string
}

// ----------------------------------------------------------
// GITHUB PROJECTS TYPE

export default interface GithubUser {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string
    company?: string
    blog: string
    location: string
    email?: string
    hireable?: string
    bio?: string
    twitter_username: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}

export interface GithubRepositoryType {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: GithubOwner
    html_url: string
    description: string
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
    created_at: string
    updated_at: string
    pushed_at: string
    git_url: string
    ssh_url: string
    clone_url: string
    svn_url: string
    homepage: any
    size: number
    stargazers_count: number
    watchers_count: number
    language: string
    has_issues: boolean
    has_projects: boolean
    has_downloads: boolean
    has_wiki: boolean
    has_pages: boolean
    has_discussions: boolean
    forks_count: number
    mirror_url: any
    archived: boolean
    disabled: boolean
    open_issues_count: number
    license: any
    allow_forking: boolean
    is_template: boolean
    web_commit_signoff_required: boolean
    topics: any[]
    visibility: string
    forks: number
    open_issues: number
    watchers: number
    default_branch: string
}

export interface GithubOwner {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
}
