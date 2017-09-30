import generateToken

users = []

resources = []

def initUser(resource):
    userName = "user" + str(len(users))
    users.append(userName)

    if resource not in resources:
        initResource(resource)

    return generateToken.getToken(userName)

def initResource(resourceName):
    resources.append(resourceName)
