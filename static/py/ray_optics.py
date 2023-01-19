'''
Updated: Jan 2022
'''
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

class Ray:
	def __init__(self, x, theta, width, c, alpha):
		if width:
			# [[ray 1], [ray 2]]
			self.ray = np.array([[x-width/2,theta],[x+width/2,theta]])
			# [[ray 1 xpos], [ray 2 xpos]]
			self.xpos = [[x-width/2],[x+width/2]]
			self.N = 2
		else:
			self.ray = np.array([[x, theta]])
			self.xpos = [[x]]
			self.N = 1

		self.zpos = [0]
		self.color = c
		self.alpha = alpha

	def operate(self, M, z):
		'''
		Evolve ray by some optical element.

		Parameters:
			M: ray matrix
			z: the new position along the optical axis
		'''
		for i in range(self.N):
			self.ray[i] = M @ self.ray[i]
			self.xpos[i].append(self.ray[i][0])
		self.zpos.append(z)

	def plot(self, ax):
		if self.N == 1:
			ax.plot(self.zpos, self.xpos[0], c=self.color)
		elif self.N == 2:
			ax.plot(self.zpos, self.xpos[0], c=self.color)
			ax.plot(self.zpos, self.xpos[1], c=self.color)
			ax.fill_between(self.zpos, self.xpos[0], self.xpos[1], color=self.color, alpha=self.alpha)

class RayOptics:
	'''
	Ray tracing with the ray transfer matrix method.
	'''
	def __init__(self):
		self.fig, self.ax = plt.subplots()
		self.rays = []
		self.z = 0

	def ray(self, x, theta, width=0, radian=True, c='k', alpha=0.2):
		'''
		Initializes a ray defined by (x, theta). 

		Optional parameters:
			width: finite width if ray
			z: offset for the starting position along the optical axis
			c: color of beam when plotting
			alpha: transparency of beam filling

		'''
		if not radian:
			theta = theta*np.pi/180
		self.rays.append(Ray(x,theta,width,c,alpha))

	def propagate(self, d):
		'''
		Free space propagation.

		Parameters:
			d: propagation distance
		'''
		self.z += d
		M = np.array([[1,d],[0,1]])
		for r in self.rays:
			r.operate(M,self.z)

	def thin_lens(self, f, D=-1):
		'''
		Passing through a thin lens.

		Parameters:
			f: focal length
			D: diameter of the lens, -1 for unbounded size (only for drawing the lens). 
			   we do not check if the ray falls off the lens.
		'''
		M = np.array([[1,0],[-1/f,1]])
		for r in self.rays:
			r.operate(M,self.z)

		if D==-1:
			self.ax.axvline(self.z, c='k')
		else:
			p = patches.FancyArrowPatch((self.z,-D/2), (self.z,D/2), arrowstyle='<->', mutation_scale=20)
			self.ax.add_patch(p)

	def show(self):
		for r in self.rays:
			r.plot(self.ax)
		plt.show()

# Example usage
# RO = RayOptics()
# RO.ray(0,1, width=0.2, c='r', radian=False)
# RO.ray(0,0, width=0.2, c='g', radian=False)
# RO.ray(0,-1, width=0.2, c='b', radian=False)

# RO.propagate(100)
# RO.thin_lens(100, D=5)
# RO.propagate(100)

# RO.propagate(200)
# RO.thin_lens(200, D=7)
# RO.propagate(200)
# RO.propagate(200)
# RO.thin_lens(200, D=7)
# RO.propagate(200)

# RO.show()