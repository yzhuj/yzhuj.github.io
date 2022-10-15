import numpy as np
import matplotlib.pyplot as plt

class RayOptics:
	'''
	Ray tracing with the ray transfer matrix method.

	For plotting,
		zpos: position of the ray along the axial direction
		xpos: position of the ray along the vertical direction
		epos: axial position of optical elements 
	'''

	def __init__(self, ray):
		'''
		ray: starting ray (x, theta)
		''' 
		self.ray = np.array(ray)
		# axial position
		self.z = 0
		# plotting
		self.zpos = [self.z]
		self.xpos = [self.ray[0]]
		# axial location of optics elements (e.g. lenses)
		self.epos = [] 

	def propagate(self, d):
		'''
		Free space propagation
		d: propagation distance
		'''
		M = np.array([[1,d],[0,1]])
		self.ray = M@self.ray
		self.z += d

		# update positions
		self.zpos.append(self.z)
		self.xpos.append(self.ray[0])

	def thin_lens(self, f):
		'''
		f: focal length
		'''
		M = np.array([[1,0],[-1/f,1]])
		self.ray = M@self.ray
		self.epos.append(self.z)


fig, ax = plt.subplots()

rays = [
	RayOptics((0.1,0)),
	RayOptics((-0.1,0)),
	RayOptics((0.1,1*np.pi/180)),
	RayOptics((-0.1,1*np.pi/180)),
	]

cs = ['r-','r-','b-','b-']

for i in range(len(rays)):
	ray = rays[i]
	
	#4f
	ray.propagate(200)
	ray.thin_lens(200)
	ray.propagate(400)
	ray.thin_lens(200)
	ray.propagate(200)

	#objective
	ray.thin_lens(5)
	ray.propagate(5)
	ax.plot(ray.zpos, ray.xpos, cs[i])

for e in rays[0].epos:
	ax.axvline(e, c='k')

plt.show()
